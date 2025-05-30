import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    };

    return config
}, error => {
    return Promise.reject(error)
});

api.interceptors.response.use(response => {
    return response.data ? response.data : response
}, error => {
    return error.response ? Promise.reject(error.response.data) : Promise.reject(error)
});

export default api;