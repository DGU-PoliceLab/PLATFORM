// 라이브러리
import { useEffect, useState } from "react";
// 서비스
import { locationCctvRead } from "@/services/locationService";
import { parseMessage } from "@/utils/message";
// 컴포넌트
import StreamView from "../streamview/component";
// 유틸
import { get_datetime } from "@/utils/time";
// 아이콘
import { LucideArrowUpRightFromSquare } from "lucide-react";
// 스타일
import "./style.css";
import { useNavigate } from "react-router-dom";

const MultiView = () => {
    const [viewData, setViewData] = useState([]);
    const [eventLocation, setEventLocation] = useState({});
    const [viewSize, setViewSize] = useState(3)
    const getLocationCctvData = async () => {
        const response = await locationCctvRead();
        if (response != null) {
            setViewData(response);
        } else {
            setViewData([]);
        }
    };
    const addLocation = (location) => {
        let temp = {};
        temp[location] = true;
        setEventLocation((pre) => {
            return { ...pre, ...temp };
        });
    };
    const delLocation = (location) => {
        let temp = {};
        temp[location] = false;
        setEventLocation((pre) => {
            return { ...pre, ...temp };
        });
    };
    useEffect(() => {
        getLocationCctvData();
    }, []);
    useEffect(() => {
        const ws = new WebSocket("wss://localhost:40000/message");
        ws.onmessage = (event) => {
            const newMessage = parseMessage(event.data);
            addLocation(newMessage.location);
        };
        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };
        return () => {
            ws.close();
        };
    }, []);
    return (
        <div id="multiview">
            <div className="controllerWrap">
                <select defaultValue={"3"} onChange={(e)=>{
                    setViewSize(e.target.value)
                }}>
                    <option value="4">작은 화면</option>
                    <option value="3">보통 화면</option>
                    <option value="2">큰 화면</option>
                    <option value="1">매우 큰 화면</option>
                </select>
            </div>
            <div className={`multiviewWrap size${viewSize}`}>
            {viewData.map((item, idx) => (
                <View
                    id={item[0]}
                    name={item[1]}
                    url={item[4]}
                    event={eventLocation[item[1]]}
                    key={idx}
                    click={() => {
                        delLocation(item[1]);
                    }}
                />
            ))}
            </div>
        </div>
    );
};

const View = ({
    id = 0,
    name = "유치실",
    url = "rtsp://",
    event = false,
    click,
}) => {
    const navigate = useNavigate();
    const [time, setTime] = useState("");
    const updateTime = () => {
        const now = get_datetime();
        setTime(now.str);
    };
    useEffect(() => {
        updateTime();
        const timer = setInterval(() => {
            updateTime();
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    // console.log(name, event);
    return (
        <div
            className={event ? "view active" : "view"}
            key="id"
            onClick={click}
        >
            <div className="headerWrap">
                <p className="title">[ {name} ]</p>
                <div
                    className="detailWrap"
                    onClick={() => {
                        navigate(`/detail/${id}`);
                    }}
                >
                    <LucideArrowUpRightFromSquare />
                </div>
            </div>
            <div className="contentWrap">
                <StreamView url={url} />
            </div>
        </div>
    );
};

export default MultiView;
