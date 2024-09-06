// 라이브러리
import { useState } from "react";
// 서비스
import { cctvUpdate } from "@/services/cctvService";
// 컴포넌트
// 아이콘
import { Cctv } from "lucide-react";
// 스타일
import "./style.css";
import StreamView from "@/components/streamview/component";

const CctvModify = ({ toggle, data }) => {
    const [cctv, setCctv] = useState(data);
    const update = (key, value) => {
        let cctvInfo = { ...cctv };
        cctvInfo[key] = value;
        setCctv(cctvInfo);
    };
    const funcModify = async () => {
        const target = cctv.id;
        const name = cctv.name;
        const url = cctv.url;
        const response = await cctvUpdate(target, name, url);
        if (response) {
            window.alert("성공적으로 수정되었습니다.");
            toggle(false);
        } else {
            window.alert("수정에 실패하였습니다.");
        }
    };
    return (
        <div id="cctvModify">
            <div className="headerWrap">
                <Cctv />
                <p className="title">CCTV 수정</p>
            </div>
            <div className="inputDataWrap">
                <div className="nameWrap inputGroupWrap">
                    <p className="title">CCTV명</p>
                    <div className="inputWrap">
                        <input
                            type="text"
                            placeholder="24자 이하로 작성해주세요."
                            defaultValue={cctv.name}
                            onChange={(e) => {
                                update("name", e.target.value);
                            }}
                        />
                        <button className="btn-1 btn-sm btn-round">
                            중복 확인
                        </button>
                    </div>
                </div>
                <div className="urlWrap inputGroupWrap">
                    <p className="title">CCTV URL</p>
                    <div className="inputWrap">
                        <input
                            type="text"
                            placeholder="CCTV RTSP URL을 입력해주세요."
                            defaultValue={cctv.url}
                            onChange={(e) => {
                                update("url", e.target.value);
                            }}
                        />
                        <button className="btn-1 btn-sm btn-round">
                            유효성검사
                        </button>
                    </div>
                </div>
            </div>
            <div className="testWrap">
                <StreamView />
            </div>
            <div className="footerWrap">
                <button
                    className="btn-2 btn-lg btn-round"
                    onClick={() => {
                        funcModify();
                    }}
                >
                    수정
                </button>
                <button
                    className="btn-1 btn-lg btn-round"
                    onClick={() => {
                        toggle(false);
                    }}
                >
                    취소
                </button>
            </div>
        </div>
    );
};

export default CctvModify;
