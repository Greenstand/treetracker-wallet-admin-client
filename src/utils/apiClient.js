import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_WALLET_API_ROOT}`,
  headers: {
    'TREETRACKER-API-KEY': secureLocalStorage.getItem('api-key') || '',
  },
});

apiClient.setAPIKeyHeader = (apiKey) => {
  apiClient.defaults.headers['TREETRACKER-API-KEY'] =
    apiKey || secureLocalStorage.getItem('api-key');

  return apiClient;
};

apiClient.setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Custom method to set auth header and make API call
apiClient.setAuthHeader = (token) => {
  apiClient.setAuthToken(token);
  return apiClient;
};

apiClient.addContentType = (contentType) => {
  if (contentType) {
    apiClient.defaults.headers['Content-Type'] = contentType;
  }

  return apiClient;
};

// all unauthorized responses will be redirected to login
apiClient.interceptors.response.use(
  (response) => {
    // If the response was successful, there's no need to do anything, just return the response
    return response;
  },
  (error) => {
    if (!error || !error.response) return Promise.reject(error);
    if (error.response.status === 401) {
      const navigate = useNavigate();
      navigate('/login');
    } else {
      return Promise.reject(error);
    }
  }
);

export default apiClient;
