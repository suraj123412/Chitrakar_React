import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const myBaseUrl = isDevelopment
    ? import.meta.env.VITE_API_BASE_URL_LOCAL
    : import.meta.env.VITE_API_BASE_URL_DEPLOY;

const AxiosInstance = axios.create({
    baseURL: myBaseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

// ✅ Add token dynamically to every request
AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default AxiosInstance;
