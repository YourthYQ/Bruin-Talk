import axios from 'axios';
// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000, // 设置请求超时时间
});

// 拦截请求，设置请求头等信息
instance.interceptors.request.use(
  (config) => {
    // 在这里添加请求头
    config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['authorization'] = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).authorization || '' : '';
    // 可以添加其他请求头或修改配置
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 拦截响应，处理返回结果
instance.interceptors.response.use(
  (response) => {
    // 处理响应结果
    return response.data;
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      // 请求发出，但服务器返回状态码不在 2xx 范围内
      console.error('Response Error Status:', error.response.status);
      console.error('Response Error Data:', error.response.data);
    } else if (error.request) {
      // 请求发出，但没有收到响应
      console.error('No Response Received');
    } else {
      // 设置请求时发生错误
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);


// 导出封装后的请求方法
export default {
  get(url, params = {}) {
    return instance.get(url, {params});
  },
  post(url, data = {}) {
    return instance.post(url, data);
  },
};
