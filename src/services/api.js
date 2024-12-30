import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5259/",
});

export default api;