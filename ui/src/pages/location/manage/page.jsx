// 라이브러리
import { useState } from "react";
// 서비스
// 컴포넌트
import LocationList from "@/components/location/list/component";
// 아이콘
// 스타일
import "./style.css";

const LocationManagePage = () => {
    return (
        <div id="locationManagePage" className="page">
            <div className="locationContainer">
                <LocationList />
            </div>
        </div>
    );
};

export default LocationManagePage;
