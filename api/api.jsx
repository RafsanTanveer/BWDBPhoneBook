import axios from "axios";

const api = axios.create({
     baseURL: "http://192.168.16.40:5000/",
    // baseURL: "http://192.168.16.41:5000/",

});

export default api;