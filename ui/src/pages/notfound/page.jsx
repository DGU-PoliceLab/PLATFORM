// 라이브러리
import { useNavigate } from "react-router-dom";
// 서비스
// 컴포넌트
// 아이콘
import { TriangleAlert } from "lucide-react";
// 스타일
import "./style.css";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div id="notFoundPage" className="page">
            <TriangleAlert />
            <p>페이지를 찾을 수 없습니다.</p>
            <button
                className="btn-1 btn-m btn-round-square"
                onClick={() => {
                    navigate("/");
                }}
            >
                메인으로
            </button>
        </div>
    );
};

export default NotFoundPage;
