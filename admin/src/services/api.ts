import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const adminData = localStorage.getItem("adminInfo");
        if (adminData) {
            const { token } = JSON.parse(adminData);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("adminInfo");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
