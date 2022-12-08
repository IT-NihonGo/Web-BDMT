import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: "http://103.197.184.66:9000",
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
