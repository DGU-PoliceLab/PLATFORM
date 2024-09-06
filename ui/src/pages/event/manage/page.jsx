// 라이브러리
import { useState, useEffect } from "react";
// 서비스
import { logRead } from "@/services/logService";
// 컴포넌트
import EventFilter from "@/components/event/filter/component";
import EventList from "@/components/event/list/component";
// 아이콘
// 스타일
import "./style.css";

const EventManagePage = () => {
    const [log, setLog] = useState([]);
    const [datetime, setDatetime] = useState("");
    const [startDatetime, setStartDatetime] = useState(null);
    const [endDatetime, setEndDatetime] = useState(null);
    const [location, setLocation] = useState([]);
    const [type, setType] = useState([]);
    const getLogData = async () => {
        const response = await logRead(
            [startDatetime, endDatetime],
            location,
            type
        );
        if (response != null) {
            setLog(response);
        } else {
            setLog([]);
        }
    };
    useEffect(() => {
        getLogData();
    }, [startDatetime, endDatetime, location, type]);
    return (
        <div id="eventManagePage" className="page">
            <div className="filterContainer">
                <EventFilter
                    datetime={datetime}
                    setDatetime={setDatetime}
                    startDatetime={startDatetime}
                    setStartDatetime={setStartDatetime}
                    endDatetime={endDatetime}
                    setEndDatetime={setEndDatetime}
                    location={location}
                    setLocation={setLocation}
                    type={type}
                    setType={setType}
                />
            </div>
            <div className="eventContainer">
                <EventList data={log} key={log.length} />
            </div>
        </div>
    );
};

export default EventManagePage;
