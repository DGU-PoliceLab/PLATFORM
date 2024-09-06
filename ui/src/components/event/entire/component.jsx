// 라이브러리
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 서비스
import { logCheck, logReadLimit } from "@/services/logService";
// 컴포넌트
// 유틸
import { get_datetime } from "@/utils/time";
// 아이콘
// 스타일
import "./style.css";

const EntireEventList = () => {
    const navigate = useNavigate();
    const [log, setLog] = useState([]);
    const getLogData = async () => {
        const response = await logReadLimit();
        if (response != null) {
            setLog(response);
        } else {
            setLog([]);
        }
    };
    const checkAllLog = async () => {
        const response = await logCheck();
        if (response) {
            window.alert("전체 이벤트 내역을 확인하였습니다.");
        } else {
            window.alert("전체 확인중 오류가 발생하였습니다.");
        }
    };
    useEffect(() => {
        const timer = setInterval(() => {
            getLogData();
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div id="entireEventList">
            <div className="headerWrap">
                <p className="title">전체 이벤트 내역</p>
                <div className="funcWrap">
                    <button
                        className="btn-2 btn-sm btn-round"
                        onClick={() => {
                            checkAllLog();
                        }}
                    >
                        전체 확인
                    </button>
                    <button
                        className="btn-2 btn-sm btn-round"
                        onClick={() => {
                            navigate("/event");
                        }}
                    >
                        전체 보기
                    </button>
                </div>
            </div>
            <div className="eventWrap" key={log}>
                {log.map((data, idx) => (
                    <EventItem data={data} key={idx} />
                ))}
            </div>
        </div>
    );
};

const EventItem = ({ data }) => {
    const [logInfo, setLogInfo] = useState(data);
    const [isChecked, setIsChecked] = useState(true);
    const parseData = (info) => {
        let parsed = {};
        parsed["id"] = info[0];
        parsed["type"] = info[1];
        parsed["location"] = info[2];
        let datetime = new Date(info[3]);
        let occured = get_datetime(datetime);
        parsed["occured"] = occured.str;
        parsed["checked"] = info[4];
        setIsChecked(info[4] ? true : false);
        setLogInfo(parsed);
    };
    useEffect(() => {
        parseData(data);
    }, []);
    return (
        <div
            className={isChecked ? "eventItem" : "eventItem active"}
            onClick={() => {
                setIsChecked(true);
                logCheck(logInfo.id);
            }}
        >
            <div className="typeWrap dataWrap">
                <span className="title">이벤트 명</span>
                <span className="content">{logInfo.type}</span>
            </div>
            <div className="descWrap">
                <div className="locatonWrap dataWrap">
                    <span className="title">발생 장소</span>
                    <span className="content">{logInfo.location}</span>
                </div>
                <div className="timeWrap dataWrap">
                    <span className="title">발생 시각</span>
                    <span className="content">{logInfo.occured}</span>
                </div>
            </div>
        </div>
    );
};

export default EntireEventList;
