// 라이브러리
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// 서비스
import { locationCctvRead } from "@/services/locationService";
// 컴포넌트
import StreamView from "@/components/streamview/component";
import OverView from "@/components/overview/component";
import PartialEventList from "@/components/event/partial/component";
// 아이콘
// 스타일
import "./style.css";

const DetailViewPage = () => {
    const location = useLocation();
    const [viewData, setViewData] = useState(null);
    const [toggle, setToggle] = useState(false);
    const getLocationCctvData = async (id) => {
        const response = await locationCctvRead();
        if (response != null) {
            response.forEach((item) => {
                if (item[0] == id) {
                    let data = {
                        locationId: item[0],
                        locationName: item[1],
                        cctvId: item[2],
                        cctvName: item[3],
                        cctvUrl: item[4],
                    };
                    setViewData(data);
                }
                return true;
            });
        } else {
            setViewData(None);
        }
    };
    useEffect(() => {
        const path = location.pathname;
        const id = parseInt(path.split("/")[2]);
        getLocationCctvData(id);
    }, []);
    return (
        <div id="detailViewPage" className="page">
            <div className={toggle ? "viewContainer min" : "viewContainer"}>
                <div className="realtimeViewContainer">
                    {viewData && <StreamView url={viewData.cctvUrl} />}
                </div>
                <div className="overViewContainer">
                    {viewData && <OverView target={viewData.locationName} />}
                </div>
            </div>
            <div className="eventContainer">
                {viewData && (
                    <PartialEventList
                        target={viewData.locationName}
                        state={toggle}
                        toggle={setToggle}
                    />
                )}
            </div>
        </div>
    );
};

export default DetailViewPage;
