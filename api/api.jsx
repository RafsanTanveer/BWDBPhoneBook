import axios from "axios";
import { serverAddress } from '../api/ServerAddress'

const api = axios.create({
    baseURL: serverAddress 
});

export default api;