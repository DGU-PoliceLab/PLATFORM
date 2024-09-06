import axios from "axios";

const ENDPOINT = "https://localhost:40000";

const checkServer = async () => {
    try {
        const response = await axios.get(ENDPOINT);
        return true;
    } catch (err) {
        return false;
    }
};

export { checkServer };
