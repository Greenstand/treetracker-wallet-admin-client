import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_WALLET_API_ROOT}`,
  headers: {
    "TREETRACKER-API-KEY": `${process.env.REACT_APP_WALLET_API_KEY}`,
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // TODO: replace with token from login when implemented
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2M2JkZTViLTQ5YjAtNDMxYS05MWM3LTMzZjI1NzIwNmZiNCIsIm5hbWUiOiJ0ZXN0dXNlciIsInBhc3N3b3JkIjoiN2JjMGZiNzYzNTMyNGYxMTM3NjlkNzdlNGUxNjY2OWM4OWU4ZDRkZGEzZjYyOTA3Nzc0ZDIzOTJlNDQ2OTI1MGM4NzczMGRmZWNlOTRiMDE0NWRlYTg4Y2YxNWRlNTkzM2U3MGM2YTcyNWY5OTIyODUxMWVmNTg4OWQ3MGZjNzciLCJzYWx0IjoiYVduNGUzRTlXT2NtS2xNQ0lUbnZtV2NhZ1k4bXkxSWhvZkRKdnowWWsxWT0iLCJsb2dvX3VybCI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjMtMDctMDdUMTg6NDk6MTAuNDc2WiIsImFib3V0IjpudWxsLCJpYXQiOjE2ODg3NTY4MDcsImV4cCI6MTcyMDI5MjgwNywiaXNzIjoiZ3JlZW5zdGFuZCJ9.ADRqz9YmB3upRPng_489vTbyMvUeTyNv8LEbAPgbiHaHPHN7GdiMJ23DQLNPyBIMvYwvXzViWyqfKEvx49LuqhM07gVvi0NztWuRPK9rCpHpN8xee4V_JU1C9nsRXaAO_31GINgZTH0xnBWBoAKCEGPbxNlt2y13AvK9NKmgQv5gYGFPTOugWgwW9xjdmVL4HDx0gW8r67dUHvl_IRKDPkAsPJVcmNq421tGcwgYtFMrF7GRmJlK_fa5oMTqPLNVt8R2W4CwZ8Vflkkl_NNU5BPZJJiFNfLhdbqfVg39oybl_eCI7sRXMZplal9caA4aya6AJQS_r64Wx5GWjh6IqU0erRnXVCfp3ND8KoNg88--nw3AErgBi9j7yIUL4-mroqHv__uEpolmg_0dtKlThvrG5BxAxIO4zkHnLzJrV4jXzsVxtmwYfNK9MOosu8KcZVcxHz7F1j1nYExaHesv2jz_DcjTH6uLBULgqU36K3VjdTCxhhU-FpkCMQPnU_gp1EbGMqiDd8pIS0zvOmk3e18SUOLIdLdvs-7GZDh3kp9zplsRGm-UkxvAEds-xaYsThLk6dGmq-IIw2QMQOxbvvPGpsUVWL6TH2S4DDn8I03ufobYpdNlywb8Oqi1rHCtPGhfYzCcXag9RBEMHBAqKeu6-nWEr7Yb5LLICSdf9Fg";

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
      navigate("/login");
    } else {
      return Promise.reject(error);
    }
  }
);

export default apiClient;
