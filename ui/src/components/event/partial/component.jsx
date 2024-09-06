// 라이브러리
import { useState, useEffect } from "react";
// 서비스
import { logRead } from "@/services/logService";
// 컴포넌트
import EventViewer from "../viewer/component";
// 아이콘
// 스타일
import "./style.css";

const PartialEventList = ({ target, state, toggle }) => {
    const [log, setLog] = useState([]);
    const getLogData = async () => {
        const response = await logRead([], [target], []);
        if (response != null) {
            let temp = [];
            response.forEach((item) => {
                temp.push({
                    id: item[0],
                    type: item[1],
                    location: item[2],
                    occured: item[3],
                    checked: item[4],
                });
            });
            setLog(temp);
        } else {
            setLog([]);
        }
    };
    useEffect(() => {
        const timer = setInterval(() => {
            getLogData(target);
          }, 1000);
          return () => clearInterval(timer);
    }, []);
    return (
        <div id="partialEventList">
            <div className="headerWrap">
                <p className="title">유치실 이벤트 내역</p>
                <div className="funcWrap">
                    <button
                        className="btn-2 btn-sm btn-round"
                        onClick={() => {
                            toggle(!state);
                        }}
                    >
                        {state ? "작게 보기" : "크게 보기"}
                    </button>
                </div>
            </div>
            <div className="tableWrap">
                <EventTable data={log} key={log.length} />
            </div>
        </div>
    );
};

const EventTable = ({ data }) => {
    const [event, setEvent] = useState(data);
    return (
        <table className="eventTable">
            <tr>
                <th className="time">이벤트 발생 일시</th>
                <th className="type">이벤트명</th>
                <th className="dummy"></th>
                <th className="check">이벤트 확인 일시</th>
                <th className="detail"></th>
            </tr>
            {event.length == 0 ? (
                <tr className="noData"></tr>
            ) : (
                <>
                    {event.map((data, idx) => (
                        <EventItem data={data} key={idx} />
                    ))}
                </>
            )}
        </table>
    );
};

const EventItem = ({ data }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [clip, setClip] = useState("");
    useEffect(() => {
        let filename = `${data.location}_${data.type}_${data.occured}_h264.mp4`;
        filename = filename.replaceAll(/[-T: ]/g, "_");
        console.log(">>>", filename);
        const url = "https://localhost:40000/file/clip/" + filename;
        setClip(url);
    }, []);
    return (
        <tr className="eventItem" key={data.id}>
            <td className="time">{data.occured}</td>
            <td className="type">{data.type}</td>
            <td className="dummy"></td>
            <td className="check">{data.checked}</td>
            <td className="detail">
                <button
                    className="btn-1 btn-m btn-round"
                    onClick={() => {
                        setIsVisible(true);
                    }}
                >
                    이벤트 상세 보기
                </button>
            </td>
            {isVisible && <EventViewer toggle={setIsVisible} url={clip} />}
        </tr>
    );
};

export default PartialEventList;
