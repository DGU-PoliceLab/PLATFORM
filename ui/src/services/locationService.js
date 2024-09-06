import axios from "axios";

const ENDPOINT = "https://localhost:40000/location";

const locationCreate = async (name, cctv) => {
    try {
        const response = await axios.post(ENDPOINT + "/create", {
            name: name,
            cctv: cctv,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.locationService.create", err);
        return { err: err };
    }
};

const locationRead = async (target = "") => {
    try {
        const response = await axios.post(ENDPOINT + "/read");
        return response.data;
    } catch (err) {
        console.error("Error occured in services.locationService.read", err);
        return { err: err };
    }
};

const locationCctvRead = async () => {
    try {
        const response = await axios.post(ENDPOINT + "/read/cctv");
        return response.data;
    } catch (err) {
        console.error(
            "Error occured in services.locationService.cctvRead",
            err
        );
        return { err: err };
    }
};

const locationNameCheck = async (name) => {
    try {
        const response = await axios.post(ENDPOINT + "/check", { name: name });
        return response.data;
    } catch (err) {
        console.error(
            "Error occured in services.locationService.nameCheck",
            err
        );
        return { err: err };
    }
};

const locationUpdate = async (target, name, cctv) => {
    try {
        const response = await axios.post(ENDPOINT + "/update", {
            target: target,
            name: name,
            cctv: cctv,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.locationService.delete", err);
        return { err: err };
    }
};

const locationDelete = async (target) => {
    try {
        const response = await axios.post(ENDPOINT + "/delete", {
            target: target,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.locationService.delete", err);
        return { err: err };
    }
};

export {
    locationCreate,
    locationRead,
    locationCctvRead,
    locationNameCheck,
    locationUpdate,
    locationDelete,
};
