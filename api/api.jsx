import axios from "axios";
import { serverAddress } from '../api/ServerAddress'

const api = axios.create({
    baseURL: serverAddress,
    headers: {
        "ngrok-skip-browser-warning": "69420"
    }
});

export default api;