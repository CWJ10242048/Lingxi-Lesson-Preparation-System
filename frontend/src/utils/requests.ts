import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpRequest {
    private readonly baseUrl: string;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.baseUrl = 'http://localhost:5000';
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            timeout: 80000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        this.interceptors();
    }

    // 请求拦截
    private interceptors() {
        this.axiosInstance.interceptors.request.use(config => {
            // 添加请求头
            config.headers = {
                ...config.headers,
                'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            };
            return config;
        }, error => {
            return Promise.reject(error);
        });

        this.axiosInstance.interceptors.response.use(response => {
            // 处理返回的数据
            console.log('返回数据处理', response);
            return response;
        }, error => {
            console.error('error==>', error);
            return Promise.reject(error);
        });
    }

    request(options: AxiosRequestConfig) {
        return this.axiosInstance(options);
    }
}

const http = new HttpRequest();
export default http;