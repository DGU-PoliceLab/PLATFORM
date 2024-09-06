import axios from "axios";

const ENDPOINT = "https://localhost:40000/cctv";

const cctvCreate = async (name, url) => {
    try {
        const response = await axios.post(ENDPOINT + "/create", {
            name: name,
            url: url,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.cctvService.create", err);
        return { err: err };
    }
};

const cctvRead = async () => {
    try {
        const response = await axios.post(ENDPOINT + "/read");
        return response.data;
    } catch (err) {
        console.error("Error occured in services.cctvService.read", err);
        return { err: err };
    }
};

const cctvNameCheck = async (name) => {
    try {
        const response = await axios.post(ENDPOINT + "/check", { name: name });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.cctvService.check", err);
        return { err: err };
    }
};

const cctvUpdate = async (target, name, url) => {
    try {
        const response = await axios.post(ENDPOINT + "/update", {
            target: target,
            name: name,
            url: url,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.cctvService.delete", err);
        return { err: err };
    }
};

const cctvDelete = async (target) => {
    try {
        const response = await axios.post(ENDPOINT + "/delete", {
            target: target,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.cctvService.delete", err);
        return { err: err };
    }
};

export { cctvCreate, cctvRead, cctvNameCheck, cctvUpdate, cctvDelete };
