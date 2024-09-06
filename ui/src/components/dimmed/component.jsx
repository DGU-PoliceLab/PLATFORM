// 라이브러리
// 서비스
// 컴포넌트
// 아이콘
// 스타일
import "./style.css";

const Dimmed = ({ toggle, child }) => {
    return (
        <div
            className="dimmed"
            onClick={(e) => {
                e.stopPropagation();
                toggle(false);
            }}
        >
            <div
                className="componentConatiner"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {child}
            </div>
        </div>
    );
};

export default Dimmed;
