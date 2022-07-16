import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://io.beta.yper.org/',
});

instance.interceptors.request.use(
  (config) => {
    config.headers!['X-Request-Timestamp'] = Date.now();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const token = '8eb12b6a57434385b24e9b07c4e5cef4';
instance.defaults.headers.common.Authorization = `Bearer ${token}`;

export default instance;
