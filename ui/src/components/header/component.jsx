// 라이브러리
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookie from 'react-cookies';
// 서비스
import { checkServer } from "@/services/serverService";
import { locationCctvRead } from "@/services/locationService";
import { logCheck } from "@/services/logService";
import { parseMessage } from "@/utils/message";
// 훅
import useNotification from "@/hooks/useNotification";
// 컴포넌트
import MenuList from "@/components/menulist/component";
// 유틸
import { get_datetime } from "@/utils/time";
import { tts } from "@/utils/voice";
// 아이콘
import Logo from "@/assets/logo.png";
import { Menu, ChevronRight, Siren, Volume2, VolumeX, BellRing, BellOff } from "lucide-react";
// 스타일
import "./style.css";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [title, setTitle] = useState([]);
    const [time, setTime] = useState("");
    const [useTts, setUseTts] = useState(false);
    const [useBrowserAlarm, setUseBrowserAlarm] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [message, setMessage] = useState("");
    const [lastAlarm, setLastAlarm] = useState("");
    // 서버 상태 확인
    const check = async () => {
        const response = await checkServer();
        if (!response) {
            navigate("/error/server");
        }
    };
    // 시간 업데이트
    const updateTime = () => {
        const now = get_datetime();
        setTime(now.str);
    };
    // 상단 페이지 타이틀 설정
    const setDetailPageTitle = async (path) => {
        const response = await locationCctvRead();
        if (response != null) {
            const id = parseInt(path.split("/")[2]);
            let flag = false;
            response.forEach((item) => {
                if (item[0] == id) {
                    setTitle(["유치실 멀티뷰", item[1]]);
                    flag = true;
                    return true;
                }
            });
            if (!flag) {
                window.alert(
                    "유효하지 않은 주소입니다.\n유치실 멀티뷰 화면으로 돌아갑니다."
                );
                navigate("/");
            }
        } else {
            window.alert(
                "유효하지 않은 주소입니다.\n유치실 멀티뷰 화면으로 돌아갑니다."
            );
            navigate("/");
        }
    };
    // 알람 확인
    const checkAlarm = () => {
        setIsNew(false);
        setMessage("");
        logCheck();
    };
    // 알람 옵션 불러오기
    const loadAlarmOptions = () => {
        const bAlarm = cookie.load("useBrowserAlarm")
        const tAlarm = cookie.load("useTtsAlarm")
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 10);
        if (bAlarm == undefined) {
            cookie.save('useBrowserAlarm', false, {
                path : '/',
                expires
            })
        }
        if (tAlarm == undefined) {
            cookie.save('useTtsAlarm', false, {
                path : '/',
                expires
            })
        }
        setUseBrowserAlarm(bAlarm == "true")
        setUseTts(tAlarm == "true")
    }
    // 매초마다 실행되는 함수
    useEffect(() => {
        loadAlarmOptions()
        updateTime()
        const timer = setInterval(() => {
            check();
            updateTime();
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    // 상단 페이지 타이틀 설정
    useEffect(() => {
        const path = location.pathname;
        if (path == "/") {
            setTitle(["유치실 멀티뷰"]);
        } else if (path.startsWith("/detail")) {
            setDetailPageTitle(path);
        } else if (path == "/event") {
            setTitle(["이벤트 리스트"]);
        } else if (path == "/cctv") {
            setTitle(["CCTV 관리"]);
        } else if (path == "/location") {
            setTitle(["유치실 관리"]);
        }
    }, [location]);
    useEffect(() => {
        const ws = new WebSocket("wss://localhost:40000/message");
        ws.onmessage = (event) => {
            const newMessage = parseMessage(event.data);
            setMessage(newMessage);
        };
        ws.onclose = () => {
            console.log("WebSocket connection closed");
            navigate("/error/server");
        };
        return () => {
            ws.close();
        };
    }, []);
    useEffect(()=>{
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 10);
        cookie.save('useBrowserAlarm', useBrowserAlarm, {
            path : '/',
            expires
        })
    },[useBrowserAlarm])
    useEffect(()=>{
        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 10);
        cookie.save('useTtsAlarm', useTts, {
            path : '/',
            expires
        })
    },[useTts])
    useEffect(() => {
        if (message != "") {
            setIsNew(true);
            const checkStr = `${message.event}, ${message.location}, ${message.occurred_at}`;
            if (lastAlarm != checkStr) {
                setLastAlarm(checkStr);
                const notificationText = `${message.location}에서 ${message.event}발생!`;
                if (useBrowserAlarm) {
                    showNotification("Policelab 2.0", {
                        body: notificationText,
                        icon: "/logoBlack.png",
                        badge: "/logoBlack.png",
                    });
                }
                if (useTts) {
                    let ttsStr = notificationText.repeat(3)
                    tts(ttsStr)
                }
            }
        }
    }, [message]);
    return (
        <div id="header">
            <div
                className="logoWrap"
                onClick={() => {
                    navigate("/");
                }}
            >
                <img className="logo" src={Logo} alt="" />
            </div>
            <div className="timeWrap">
                <p className="time">{time}</p>
            </div>
            <div className="titleWrap">
                {title.map((item, idx) => (
                    <p className="title">
                        {idx != 0 && <ChevronRight />}
                        {item}
                    </p>
                ))}
            </div>
            {isNew && (
                <div
                    className="alarmWrap"
                    onClick={() => {
                        checkAlarm();
                    }}
                >
                    <Siren />
                    <p>
                        {message.location}에서 {message.event}발생
                    </p>
                </div>
            )}
            <div className="browserAlarmWrap" onClick={()=>{
                if (useBrowserAlarm) {
                    window.alert("브라우저 알람을 끕니다.")
                } else {
                    window.alert("브라우저 알람을 켭니다.")
                }
                setUseBrowserAlarm(!useBrowserAlarm)}}>
                {useBrowserAlarm ? <BellRing className="active"></BellRing> : <BellOff></BellOff>}
            </div>
            <div className="ttsWrap" onClick={()=>{
                if (useTts) {
                    window.alert("음성 알람을 끕니다.")
                } else {
                    window.alert("음성 알람을 켭니다.")
                }
                setUseTts(!useTts)}}>
                {useTts ? <Volume2 className="active"></Volume2> : <VolumeX></VolumeX>}
            </div>
            <div
                className="menuWrap"
                onClick={() => {
                    setIsMenu(true);
                }}
            >
                <Menu className="menu icon_32" />
            </div>
            {isMenu && <MenuList toggle={setIsMenu} />}
        </div>
    );
};

export default Header;
