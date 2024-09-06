// 라이브러리
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 서비스
// 컴포넌트
// 아이콘
// 스타일
import "./style.css";

const MenuList = ({ toggle }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const close = () => {
        setIsOpen(false);
        setTimeout(() => {
            toggle(false);
        }, 300);
    };
    useEffect(() => {
        setIsOpen(true);
    }, []);
    return (
        <div
            id="menuList"
            className={isOpen && "active"}
            onClick={(e) => {
                e.stopPropagation();
                close();
            }}
        >
            <div className={isOpen ? "menuWrap active" : "menuWrap"}>
                <p
                    className="menuItem"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    유치실 멀티뷰
                </p>
                <p
                    className="menuItem"
                    onClick={() => {
                        navigate("/event");
                    }}
                >
                    이벤트 리스트
                </p>
                <p
                    className="menuItem"
                    onClick={() => {
                        navigate("/cctv");
                    }}
                >
                    CCTV 관리
                </p>
                <p
                    className="menuItem"
                    onClick={() => {
                        navigate("/location");
                    }}
                >
                    유치실 관리
                </p>
            </div>
        </div>
    );
};

export default MenuList;
