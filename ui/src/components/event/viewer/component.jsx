// 라이브러리
// 서비스
// 컴포넌트
// 아이콘
// 스타일
import "./style.css";

const EventViewer = ({ toggle, url }) => {
    return (
        <div
            className="dimmed"
            onClick={(e) => {
                e.stopPropagation();
                toggle(false);
            }}
        >
            <div
                className="eventViewer"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                <video src={url} controls />
            </div>
            <button className="btn-1 btn-m btn-round">닫기</button>
        </div>
    );
};

export default EventViewer;
