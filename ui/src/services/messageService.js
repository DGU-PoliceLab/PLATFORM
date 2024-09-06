import axios from "axios";

const ENDPOINT = "https://localhost:40000/message";

const messageLive = async () => {
    try {
        const response = await axios.post(ENDPOINT + "/live");
        return response.data;
    } catch (err) {
        console.error("Error occured in services.logService.read", err);
        return { err: err };
    }
};

export { messageLive };
