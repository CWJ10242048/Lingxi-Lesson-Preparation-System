import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5000', // 后端服务器地址
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器
http.interceptors.request.use(
    config => {
        // 可以在这里添加 token 等
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default http; 