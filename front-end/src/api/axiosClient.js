import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
axiosClient.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

export default axiosClient
