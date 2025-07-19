import axios from 'axios';

const fetchInterceptor = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // No need to add Authorization header manually
  },
  withCredentials: true, // ✅ Important for sending cookies
});

// Request interceptor
fetchInterceptor.interceptors.request.use(
  config => {
    // No token injection needed
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
fetchInterceptor.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default fetchInterceptor;
