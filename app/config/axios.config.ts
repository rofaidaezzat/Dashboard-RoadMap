// Add global type for window._isLoggingOut to avoid 'any' usage
// This prevents multiple redirects on 401 errors

declare global {
    interface Window {
    _isLoggingOut?: boolean;
    }
}

import axios from "axios";
import { refreshAccessToken } from "../services/authService";

export const axiosInstance = axios.create({
    baseURL: "https://b684-102-189-220-226.ngrok-free.app/", 
    withCredentials: true, 
    timeout: 10000, 
});

const getAccessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken");
    }
    return null;
};

const clearAuthData = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedInUser");
    }
};

axiosInstance.interceptors.request.use(
    (config) => {
        const noAuthEndpoints = ["/auth/login", "/auth/refresh", "/auth/register"];
        if (noAuthEndpoints.some((url) => config.url?.includes(url))) {
            return config; 
        }

        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; 
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config; 
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; 
    
            try {
                const newToken = await refreshAccessToken();
    
                if (newToken) {
                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                console.log(err);
                clearAuthData();

                // Prevent multiple redirects using window._isLoggingOut
                if (!window._isLoggingOut) {
                    window._isLoggingOut = true;
                    window.location.href = "/authpage";
                    return new Promise(() => {}); // Halt further processing
                }
            }
        }
        return Promise.reject(error); 
    }
);

