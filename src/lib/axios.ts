import axios from "axios";
import { config } from "dotenv";
config();
export const axiosInstance = axios.create({
  baseURL: "https://taskify-xi-six.vercel.app/api",
});

// Add a request interceptor to automatically attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
