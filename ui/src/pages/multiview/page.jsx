// 라이브러리
// 서비스
// 컴포넌트
import MultiView from "@/components/multiview/component";
import EntireEventList from "@/components/event/entire/component";
// 아이콘
// 스타일
import "./style.css";

const MultiViewPage = () => {
    return (
        <div id="multiViewPage" className="page">
            <div className="multiviewContainer">
                <MultiView />
            </div>
            <div className="eventContainer">
                <EntireEventList />
            </div>
        </div>
    );
};

export default MultiViewPage;
