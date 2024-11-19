import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.2:3000',
  withCredentials: true
});

export default axiosInstance;
