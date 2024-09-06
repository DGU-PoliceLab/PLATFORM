// 라이브러리
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 서비스
import { checkServer } from "@/services/serverService";
// 컴포넌트
// 아이콘
import { TriangleAlert, Loader } from "lucide-react";
// 스타일
import "./style.css";

const ErrorPage = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(10);
    const check = async () => {
        const response = await checkServer();
        if (response) {
            navigate("/");
        } else {
            setCount(10);
        }
    };
    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        if (count == 0) {
            check();
        }
    }, [count]);
    return (
        <div id="errorPage" className="page">
            <TriangleAlert />
            <p>서버에 문제가 발생했습니다.</p>
            <ul>
                <li>문제가 계속되면 관리자에게 문의해 주세요.</li>
                <li>메인 페이지로 돌아가려면 아래 버튼을 클릭해 주세요.</li>
                <li>지속적으로 문제가 발생하면 고객 지원에 연락해 주세요.</li>
            </ul>
            <button
                className="btn-1 btn-m btn-round-square"
                onClick={() => {
                    navigate("/");
                }}
            >
                <Loader />
                <strong>{count}</strong>초 이후 다시 시도합니다.
            </button>
        </div>
    );
};

export default ErrorPage;
