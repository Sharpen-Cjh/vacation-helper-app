import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.29.113.148:3000',
  withCredentials: true
});

export default axiosInstance;
