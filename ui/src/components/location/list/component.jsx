// 라이브러리
import { useEffect, useState } from "react";
// 서비스
import { locationRead } from "@/services/locationService";
// 컴포넌트
import LocationRegister from "../register/component";
import LocationModify from "../modify/component";
import LocationDelete from "../delete/component";
import Dimmed from "@/components/dimmed/component";
// 아이콘
// 스타일
import "./style.css";

const LocationList = () => {
    const [target, setTarget] = useState(false);
    const [method, setMethod] = useState("");
    const [locationData, setLocationData] = useState([]);
    const getLocationData = async () => {
        const response = await locationRead();
        if (response != null) {
            setLocationData(response);
        } else {
            setLocationData([]);
        }
    };
    useEffect(() => {
        if (target == false) {
            setMethod("");
            getLocationData();
        }
    }, [target]);
    return (
        <div id="locationList">
            <div className="headerWrap">
                <p className="title">유치실 관리</p>
                <div className="funcWrap">
                    <button
                        className="btn-2 btn-m btn-round"
                        onClick={() => {
                            setTarget(true);
                            setMethod("register");
                        }}
                    >
                        유치실 등록
                    </button>
                </div>
            </div>
            <div className="tableWrap">
                <LocationTable
                    setTarget={setTarget}
                    setMethod={setMethod}
                    data={locationData}
                    key={locationData}
                />
            </div>
            {target && method == "register" && (
                <Dimmed
                    toggle={setTarget}
                    child={<LocationRegister toggle={setTarget} />}
                ></Dimmed>
            )}
            {target && method == "modify" && (
                <Dimmed
                    toggle={setTarget}
                    child={<LocationModify toggle={setTarget} data={target} />}
                ></Dimmed>
            )}
            {target && method == "delete" && (
                <Dimmed
                    toggle={setTarget}
                    child={<LocationDelete toggle={setTarget} data={target} />}
                ></Dimmed>
            )}
        </div>
    );
};

const LocationTable = ({ setTarget, setMethod, data }) => {
    const [locationData, setLocationData] = useState([]);
    useEffect(() => {
        setLocationData(data);
    }, []);
    return (
        <table className="locationTable">
            <tr>
                <th className="id">ID</th>
                <th className="name">유치실 명</th>
                <th className="cctv">유치실 CCTV</th>
                <th className="rename"></th>
                <th className="delete"></th>
            </tr>
            {locationData.map((item, idx) => (
                <LocationItem
                    setTarget={setTarget}
                    setMethod={setMethod}
                    data={item}
                    key={idx}
                />
            ))}
        </table>
    );
};

const LocationItem = ({ setTarget, setMethod, data }) => {
    const [locationInfo, setLocationInfo] = useState({});
    const parseData = (info) => {
        let parsed = {};
        parsed["id"] = info[0];
        parsed["name"] = info[1];
        parsed["cctv"] = info[3];
        setLocationInfo(parsed);
    };
    useEffect(() => {
        parseData(data);
    }, []);
    return (
        <tr className="locationItem">
            <td className="id">{locationInfo.id}</td>
            <td className="name">{locationInfo.name}</td>
            <td className="cctv">{locationInfo.cctv}</td>
            <td className="rename">
                <button
                    className="btn-1 btn-m btn-round"
                    onClick={() => {
                        setTarget(locationInfo);
                        setMethod("modify");
                    }}
                >
                    수정
                </button>
            </td>
            <td className="delete">
                <button
                    className="btn-1 btn-m btn-round"
                    onClick={() => {
                        setTarget(locationInfo);
                        setMethod("delete");
                    }}
                >
                    삭제
                </button>
            </td>
        </tr>
    );
};

export default LocationList;
