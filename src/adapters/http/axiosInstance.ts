import axios, {AxiosRequestConfig} from 'axios';
import {toast} from 'react-toastify';
import AppConfig from "../../infrastructure/config";
import LocalStorage from "../storage/localStorage";
import container from "../../infrastructure/container";
import AppRoutesConfig from "../../infrastructure/routes/config";


const APIClient = () => {
    const apiClient = axios.create({
        baseURL: AppConfig.HTTP_SERVER_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    apiClient.interceptors.request.use((config) => {
        const accessToken = LocalStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

// Global response interceptor for handling errors and refreshing tokens
    apiClient.interceptors.response.use((response) => {
        // if (response.config.method !== 'get') {
        //     toast.success('Operation completed successfully!');
        // }
        return response;
    }, async (error) => {
        const originalRequest = error.config;
        const authService = container.resolve("authService");
        // If the error is 401 (Unauthorized) and it's not a retry, refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await authService.refreshAccessToken();
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest as AxiosRequestConfig);
            } catch (refreshError) {
                await authService.logout();
                window.location.href = AppRoutesConfig.login;  // Redirect to login page if refresh fails
                toast.error('Session expired, please log in again.');
            }
        }
        // Handle other types of errors
        if (error.response) {

            switch (error.response.status) {
                case 400:
                    if (error.response.data && Array.isArray(error.response.data)) {
                        error.response.data.forEach((item) => {
                            toast.error(item?.message);
                        })
                    } else {
                        toast.error(error.response.data?.message || 'Bad request. Please check the data you submitted.');
                    }
                    break;
                case 404:
                    toast.error(error.response.data?.message || 'Resource not found.');
                    break;
                case 500:
                    toast.error('Internal server error. Please try again later.');
                    break;
                default:
                    toast.error('An error occurred. Please try again.');
            }
        } else if (error.request) {
            toast.error('No response from the server. Please check your internet connection.');
        } else {
            toast.error('Request error: ' + error.message);
        }

        return Promise.reject(error);
    });
    return apiClient
}

export default APIClient;
