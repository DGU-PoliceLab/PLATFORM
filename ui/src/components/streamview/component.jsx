// 라이브러리
import { useEffect, useState } from "react";
// 서비스
// 컴포넌트
// 아이콘
import { Loader } from "lucide-react";
// 스타일
import "./style.css";

const StreamView = ({ url }) => {
    const [rtspUrl, setRtspUrl] = useState(null);
    const conv = (strUrl) => {
        if (strUrl != "") {
            let stream = "https://localhost:40000/rtsp?url=";
            stream += btoa(strUrl);
            setRtspUrl(stream);
        }
    };
    useEffect(() => {
        conv(url);
    }, []);
    return (
        <div className="streamView">
            {rtspUrl == null ? (
                <p>No Signal</p>
            ) : (
                <>
                    <Loader className="spinner" />
                    <img src={rtspUrl} alt="" srcset="" />
                </>
            )}
        </div>
    );
};

export default StreamView;
