import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // 🔐 This is required for Sanctum cookie-based sessions
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export default axiosInstance;
