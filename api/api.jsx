import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.16.41:5000/",
    // baseURL: "https://c709-103-141-9-1.in.ngrok.io/",
});

export default api;