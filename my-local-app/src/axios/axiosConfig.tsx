// src/axios/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://shop.staging.bmdapp.store:3249', // URL gốc của API
  headers: {
    
    'namespace': 'huyphan'
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['token'] = `${token}`;
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized - Please login again');
      
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
