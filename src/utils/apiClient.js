/* eslint-disable no-debugger */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_WALLET_API_ROOT}`,
  headers: {
    'TREETRACKER-API-KEY': `${process.env.REACT_APP_WALLET_API_KEY}`,
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// all unauthorized responses will be redirected to login
apiClient.interceptors.response.use(
  (response) => {
    // If the response was successful, there's no need to do anything, just return the response
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const navigate = useNavigate();
      navigate('/login');
    } else {
      return Promise.reject(error);
    }
  }
);

export default apiClient;
