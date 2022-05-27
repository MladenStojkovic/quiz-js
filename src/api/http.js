import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASEURL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add global loading or other interceptor if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const service = {
  get(url, data) {
    return axiosInstance.get(url, {
      params: data
    });
  },

  post(url, data) {
    return axiosInstance.post(url, data);
  },

  put(url, data) {
    return axiosInstance.put(url, data);
  },

  delete(url, data) {
    return axiosInstance.delete(url, data);
  },

  upload(url, file) {
    return axiosInstance.post(url, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })},

  download(url, data) {
    window.location.href = `${BASE_URL}/${url}?${formatJsonToUrlParams(data)}`;
  }
}

export default service