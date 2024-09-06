// 라이브러리
import { useEffect, useState } from "react";
// 서비스
// 컴포넌트
import EventViewer from "../viewer/component";
// 유틸
import { indicatorArray } from "@/utils/array";
// 아이콘
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
// 스타일
import "./style.css";

const EventList = ({ data }) => {
    const [logData, setLogDate] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [curPage, setCurPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        setLogDate(data);
    }, []);
    useEffect(() => {
        setCurPage(0);
        setLastPage(Math.floor(logData.length / perPage));
    }, [logData]);
    useEffect(() => {
        let startIdx = curPage * perPage;
        let endIdx = (curPage + 1) * perPage;
        if (endIdx >= logData.length) {
            endIdx = logData.length;
        }
        setPageData(logData.slice(startIdx, endIdx));
    }, [logData, curPage, lastPage, perPage]);
    return (
        <div id="eventList">
            <div className="headerWrap">
                <p className="title">유치실 이벤트 내역</p>
            </div>
            <div className="tableWrap">
                <EventTable data={pageData} key={pageData} />
            </div>
            <div className="pageControlWrap">
                <PageController
                    curPage={curPage}
                    lastPage={lastPage}
                    changePage={setCurPage}
                />
            </div>
        </div>
    );
};

const EventTable = ({ data }) => {
    return (
        <table className="eventTable">
            <tr>
                <th className="location">이벤트 발생 위치</th>
                <th className="time">이벤트 발생 일시</th>
                <th className="type">이벤트명</th>
                <th className="dummy"></th>
                <th className="check">이벤트 확인 일시</th>
                <th className="detail"></th>
            </tr>
            {data.map((item, idx) => (
                <EventItem data={item} key={idx} />
            ))}
        </table>
    );
};

const EventItem = ({ data }) => {
    const [logInfo, setLogInfo] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [clip, setClip] = useState("");
    const parseData = (info) => {
        let parsed = {};
        parsed["id"] = info[0];
        parsed["type"] = info[1];
        parsed["location"] = info[2];
        parsed["occured"] = info[3];
        parsed["checked"] = info[4];
        let filename = `${parsed.location}_${parsed.type}_${parsed.occured}_h264.mp4`;
        filename = filename.replaceAll(/[-T: ]/g, "_");
        console.log(">>>", filename);
        const url = "https://localhost:40000/file/clip/" + filename;
        setClip(url);
        setLogInfo(parsed);
    };
    useEffect(() => {
        parseData(data);
    }, []);
    return (
        <tr className="eventItem">
            <td className="location">{logInfo.location}</td>
            <td className="time">{logInfo.occured}</td>
            <td className="type">{logInfo.type}</td>
            <td className="dummy"></td>
            <td className="check">{logInfo.checked}</td>
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

const PageController = ({ curPage, lastPage, changePage }) => {
    const [indicator, setIndicator] = useState([]);
    const first = () => {
        changePage(0);
    };
    const last = () => {
        changePage(lastPage);
    };
    const prev = () => {
        if (curPage > 0) {
            changePage(curPage - 1);
        }
    };
    const next = () => {
        if (curPage < lastPage) {
            changePage(curPage + 1);
        }
    };
    useEffect(() => {
        const indArray = indicatorArray(curPage, lastPage);
        setIndicator(indArray);
    }, [curPage, lastPage]);
    return (
        <div className="pageController">
            <button
                className="btn-2 btn-wh-sm btn-round-square"
                onClick={first}
            >
                <ChevronsLeft />
            </button>
            <button className="btn-2 btn-wh-sm btn-round-square" onClick={prev}>
                <ChevronLeft />
            </button>
            <div className="indicatorWrap">
                {indicator.map((item, idx) => (
                    <button
                        className={
                            item - 1 == curPage
                                ? "indicator btn-3 btn-wh-sm btn-round-square"
                                : "indicator btn-1 btn-wh-sm btn-round-square"
                        }
                        key={`indicator${idx}`}
                        onClick={() => {
                            changePage(item - 1);
                        }}
                    >
                        <span>{item}</span>
                    </button>
                ))}
            </div>
            <button className="btn-2 btn-wh-sm btn-round-square" onClick={next}>
                <ChevronRight />
            </button>
            <button className="btn-2 btn-wh-sm btn-round-square" onClick={last}>
                <ChevronsRight />
            </button>
        </div>
    );
};

export default EventList;
