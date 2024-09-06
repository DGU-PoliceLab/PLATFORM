// 라이브러리
import { useEffect, useState } from "react";
// 서비스
import { locationUpdate } from "@/services/locationService";
import { cctvRead } from "@/services/cctvService";
// 컴포넌트
// 아이콘
import { DoorClosed } from "lucide-react";
// 스타일
import "./style.css";

const LocationModify = ({ toggle, data }) => {
    const [location, setCctv] = useState(data);
    const [cctvData, setCctvData] = useState([]);
    const update = (key, value) => {
        let locationInfo = { ...location };
        locationInfo[key] = value;
        setCctv(locationInfo);
    };
    const getCctvData = async () => {
        const response = await cctvRead();
        if (response != null) {
            setCctvData(response);
        } else {
            setCctvData([]);
        }
    };
    const funcModify = async () => {
        const target = location.id;
        const name = location.name;
        const cctv = location.cctv;
        const response = await locationUpdate(target, name, cctv);
        if (response) {
            window.alert("성공적으로 수정되었습니다.");
            toggle(false);
        } else {
            window.alert("수정에 실패하였습니다.");
        }
    };
    useEffect(() => {
        getCctvData();
    }, []);
    return (
        <div id="locationModify">
            <div className="headerWrap">
                <DoorClosed />
                <p className="title">유치실 수정</p>
            </div>
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
                            defaultValue={location.name}
                        />
                        <button className="btn-1 btn-sm btn-round">
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
                            <option value={-1}>-</option>
                            {cctvData.map((item, idx) => (
                                <option
                                    value={item[0]}
                                    key={idx}
                                    selected={location.cctv == item[1]}
                                >
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

export default LocationModify;
