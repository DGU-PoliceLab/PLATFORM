// 라이브러리
import { useEffect, useState } from "react";
// 서비스
import { locationCreate, locationNameCheck } from "@/services/locationService";
import { cctvRead } from "@/services/cctvService";
// 컴포넌트
// 아이콘
import { DoorClosed, AlertTriangle } from "lucide-react";
// 스타일
import "./style.css";

const LocationRegister = ({ toggle }) => {
    const [name, setName] = useState("");
    const [nameCheck, setNameCheck] = useState(false);
    const [cctv, setCctv] = useState(-1);
    const [cctvData, setCctvData] = useState([]);
    const [message, setMessage] = useState("");
    const checkName = async () => {
        if (name != "") {
            const response = await locationNameCheck(name);
            setNameCheck(response);
            if (response) {
                setMessage("");
            } else {
                setMessage("이미 사용중인 유치실 명입니다.");
            }
        } else {
            setNameCheck(false);
            setMessage("유치실 명은 공백으로 설정할 수 없습니다.");
        }
    };
    const isCheckProcessDone = () => {
        if (!nameCheck) {
            setMessage("유치실 명 중복 확인이 필요합니다.");
        } else {
            funcCreate(name, cctv);
        }
    };
    const update = (key, value) => {
        if (key == "name") {
            setName(value);
        } else if (key == "cctv") {
            setCctv(value);
        }
    };
    const getCctvData = async () => {
        const response = await cctvRead();
        if (response != null) {
            setCctvData(response);
        } else {
            setCctvData([]);
        }
    };
    const funcCreate = async (name, cctv) => {
        if (name != "" && cctv != "") {
            const response = await locationCreate(name, cctv);
            if (response) {
                window.alert("성공적으로 등록되었습니다.");
                toggle(false);
            } else {
                window.alert("등록에 실패하였습니다.");
            }
        }
    };
    useEffect(() => {
        getCctvData();
    }, []);
    return (
        <div id="locationRegister">
            <div className="headerWrap">
                <DoorClosed />
                <p className="title">유치실 등록</p>
            </div>
            {message != "" && (
                <div className="msg msgDanger">
                    <AlertTriangle />
                    <p>{message}</p>
                </div>
            )}
            <div className="inputDataWrap">
                <div className="nameWrap inputGroupWrap">
                    <p className="title">유치실 명</p>
                    <div className="inputWrap">
                        <input
                            type="text"
                            placeholder="24자 이하로 작성해주세요."
                            onChange={(e) => {
                                update("name", e.target.value);
                            }}
                            defaultValue={name}
                        />
                        <button
                            className="btn-1 btn-sm btn-round"
                            onClick={() => {
                                checkName();
                            }}
                        >
                            중복 확인
                        </button>
                    </div>
                </div>
                <div className="urlWrap inputGroupWrap">
                    <p className="title">CCTV</p>
                    <div className="inputWrap">
                        <select
                            onChange={(e) => {
                                update("cctv", e.target.value);
                            }}
                        >
                            <option value={-1} selected>
                                -
                            </option>
                            {cctvData.map((item, idx) => (
                                <option value={item[0]} key={idx}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="footerWrap">
                <button
                    className="btn-2 btn-lg btn-round"
                    onClick={() => {
                        isCheckProcessDone();
                    }}
                >
                    등록
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

export default LocationRegister;
