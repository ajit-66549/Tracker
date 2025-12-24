import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true,                 // this sends cookies to the backend along with the request
});

export default api;