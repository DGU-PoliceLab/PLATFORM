import axios from "axios";

const ENDPOINT = "https://localhost:40000/event";

const eventCreate = async (e_type, name) => {
    try {
        const response = await axios.post(ENDPOINT + "/create", {
            e_type: e_type,
            name: name,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.eventService.create", err);
        return { err: err };
    }
};

const eventRead = async (target = "") => {
    try {
        const response = await axios.post(ENDPOINT + "/read", {
            target: target,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.eventService.read", err);
        return { err: err };
    }
};

const eventUpdate = async (target, e_type, name) => {
    try {
        const response = await axios.post(ENDPOINT + "/update", {
            target: target,
            e_type: e_type,
            name: name,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.eventService.delete", err);
        return { err: err };
    }
};

const eventDelete = async (target) => {
    try {
        const response = await axios.post(ENDPOINT + "/delete", {
            target: target,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.eventService.delete", err);
        return { err: err };
    }
};

export { eventCreate, eventRead, eventUpdate, eventDelete };
