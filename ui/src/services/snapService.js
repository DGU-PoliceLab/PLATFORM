import axios from "axios";

const ENDPOINT = "https://localhost:40000/snap";

const snapRead = async (target) => {
    try {
        const response = await axios.post(ENDPOINT + "/read", {
            target: target,
        });
        return response.data;
    } catch (err) {
        console.error("Error occured in services.snapService.snapRead", err);
        return { err: err };
    }
};

export { snapRead };
