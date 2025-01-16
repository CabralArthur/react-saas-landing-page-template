import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
// Add request interceptor to include token in requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('auth-token');

    if (token) {
        const parsedToken = JSON.parse(token).state.token

        if (parsedToken) {
            config.headers.Authorization = `Bearer ${parsedToken}`
        }
    };

    return config
}, error => {
    return Promise.reject(error)
});

api.interceptors.response.use(response => {
    return response.data ? response.data : response
}, error => {
    return Promise.reject(error.response.data)
});

export default api;