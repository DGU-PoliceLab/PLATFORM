// 라이브러리
import { useState } from "react";
// 서비스
// 컴포넌트
import CctvList from "@/components/cctv/list/component";
// 아이콘
// 스타일
import "./style.css";

const CctvManagePage = () => {
    return (
        <div id="cctvManagePage" className="page">
            <div className="cctvContainer">
                <CctvList />
            </div>
        </div>
    );
};

export default CctvManagePage;
