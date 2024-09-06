import axios from "axios";

const ENDPOINT = "https://localhost:40000/log";

const logRead = async (datetime = [], location = [], types = []) => {
    try {
        if (datetime[0] == null || datetime[1] == null) {
            datetime = [];
        }
        const response = await axios.post(ENDPOINT + "/read", {
            datetime: datetime,
            locations: location,
            types: types,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.logService.read", err);
        return { err: err };
    }
};

const logReadLimit = async (datetime = [], location = [], types = []) => {
    try {
        if (datetime[0] == null || datetime[1] == null) {
            datetime = [];
        }
        const response = await axios.post(ENDPOINT + "/read/limit", {
            datetime: datetime,
            locations: location,
            types: types,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.logService.read", err);
        return { err: err };
    }
};

const logCheck = async (target = -1) => {
    try {
        const response = await axios.post(ENDPOINT + "/check", {
            target: target,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.logService.check", err);
        return { err: err };
    }
};

export { logRead, logReadLimit, logCheck };
