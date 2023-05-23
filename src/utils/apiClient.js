import axios from "axios";

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
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlkNmM2NzRmLWFlNjItNGZhYi04ZDE0LWFlNWRlOWYxNGFiOCIsIm5hbWUiOiJ0ZXN0dXNlciIsInBhc3N3b3JkIjoiMWM4ZTQzMjQ2MjY0OGQ4MjVhZGU0OTgzZGE0YjFjOWNjMjMxMTgwZDNkZDBlNzdiMGNmZTBiMjhjNWUyZjJiMzlhYTNhZGFiZmNkNWUxZmU5NjhiOWU4MTUwMDVjZjY3NDk5YzMwMTc3ZjRjMDE5OWUzOTA2NGNlYWE1YWRlZmEiLCJzYWx0Ijoic2FsdCIsImxvZ29fdXJsIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0wOVQwNjo0NzoxOC4zMzhaIiwiaWF0IjoxNjg0NDQ2Mjg3LCJleHAiOjE3MTU5ODIyODcsImlzcyI6ImdyZWVuc3RhbmQifQ.Fiu3RydHSSvpNJxWW5bAyy-O-bIUbfB4tpMi3l45jkZ6P6YooUHCgWo6ruMQfyf8Y53sedV5fnXF8i7c_4DKgTvsXZE8lICrUSGlLzl7NaBInzm3a18oiVdcA72C-qozBGjGQY04UZDsvw8NRGMWvn6EBb1gKcLQ6GjzHbWdpJQc2UPDCjyZFzvtwNfJVbc-RQ1sEDX6yADAOADjPHuIoQR8eUG0mUgRiqYzsU8UuklB40E5QomQ0bNeKoHSC1303wLWb5rKXVwWBCBKOZWzVu2Am1YeaCx3MX6ib9MIfOCMr0OQK6AAiaKBPRNmzhkT8hx0hCrg6SfUbpk517WCe4cweoNU_eL5fYfMcCv2uBFljd6F8GNouU8DEyNDX8Kb5ufSH9v9lo9CCZQqt5BuepKb3n7e5ffCoLa5dE6ySHd9HRMdrgPq_87cql1dewj1k508pdWd6t8oU08Vr_cZHu47NB_ClK9EjxC5Q24nPFLTZYNSq90Xet0bOSEJW5QwU-MuLL_6ymazvx4pK2ugssMbY3j3CTEyoBgpqq919ryvqaZVoslevMMD1-X_EqUUXCdZ5oYvbDSbiCG6g-xNGfdPoRRLBBxQ3FYSM-e-zd3RSkFW2XnzjtIL_YgGhlVOI1dscTj7i27CKThxe6zmxWzkiOz3-xhx39MB3WhbKCw";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
