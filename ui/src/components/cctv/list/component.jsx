// 라이브러리
import { useEffect, useState } from "react";
// 서비스
import { cctvRead } from "@/services/cctvService";
// 컴포넌트
import CctvRegister from "@/components/cctv/register/component";
import CctvModify from "../modify/component";
import CctvDelete from "../delete/component";
import Dimmed from "@/components/dimmed/component";
// 아이콘
// 스타일
import "./style.css";

const CctvList = () => {
    const [target, setTarget] = useState(false);
    const [method, setMethod] = useState("");
    const [cctvData, setCctvData] = useState([]);
    const getCctvData = async () => {
        const response = await cctvRead();
        if (response != null) {
            setCctvData(response);
        } else {
            setCctvData([]);
        }
    };
    useEffect(() => {
        if (target == false) {
            setMethod("");
            getCctvData();
        }
    }, [target]);
    return (
        <div id="cctvList">
            <div className="headerWrap">
                <p className="title">CCTV 관리</p>
                <div className="funcWrap">
                    <button
                        className="btn-2 btn-m btn-round"
                        onClick={() => {
                            setTarget(true);
                            setMethod("register");
                        }}
                    >
                        CCTV 등록
                    </button>
                </div>
            </div>
            <div className="tableWrap">
                <CctvTable
                    setTarget={setTarget}
                    setMethod={setMethod}
                    data={cctvData}
                    key={cctvData}
                />
            </div>
            {target && method == "register" && (
                <Dimmed
                    toggle={setTarget}
                    child={<CctvRegister toggle={setTarget} />}
                ></Dimmed>
            )}
            {target && method == "modify" && (
                <Dimmed
                    toggle={setTarget}
                    child={<CctvModify toggle={setTarget} data={target} />}
                ></Dimmed>
            )}
            {target && method == "delete" && (
                <Dimmed
                    toggle={setTarget}
                    child={<CctvDelete toggle={setTarget} data={target} />}
                ></Dimmed>
            )}
        </div>
    );
};

const CctvTable = ({ setTarget, setMethod, data }) => {
    const [cctvData, setCctvData] = useState([]);
    useEffect(() => {
        setCctvData(data);
    }, []);
    return (
        <table className="cctvTable">
            <tr>
                <th className="id">ID</th>
                <th className="name">CCTV명</th>
                <th className="url">URL</th>
                <th className="createat">등록일시</th>
                <th className="rename"></th>
                <th className="delete"></th>
            </tr>
            {cctvData.map((item, idx) => (
                <CctvItem
                    setTarget={setTarget}
                    setMethod={setMethod}
                    data={item}
                    key={idx}
                />
            ))}
        </table>
    );
};

const CctvItem = ({ setTarget, setMethod, data }) => {
    const [cctvInfo, setCctvInfo] = useState({});
    const parseData = (info) => {
        let parsed = {};
        parsed["id"] = info[0];
        parsed["name"] = info[1];
        parsed["url"] = info[2];
        parsed["createat"] = info[3];
        setCctvInfo(parsed);
    };
    useEffect(() => {
        parseData(data);
    }, []);
    return (
        <tr className="cctvItem">
            <td className="id">{cctvInfo.id}</td>
            <td className="name">{cctvInfo.name}</td>
            <td className="url">{cctvInfo.url}</td>
            <td className="createat">{cctvInfo.createat}</td>
            <td className="rename">
                <button
                    className="btn-1 btn-m btn-round"
                    onClick={() => {
                        setTarget(cctvInfo);
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
                        setTarget(cctvInfo);
                        setMethod("delete");
                    }}
                >
                    삭제
                </button>
            </td>
        </tr>
    );
};

export default CctvList;
