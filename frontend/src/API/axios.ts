import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true // for sanctum
});

// Interceptor for injecting token for every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');

    // if token is NOT null
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor for handle expired token (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('admin_token');
            globalThis.location.href = '/admin';
        }
        // reject the promise
        return Promise.reject(error);
    }
)

export default api;