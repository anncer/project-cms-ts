/* eslint-disable no-param-reassign */
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { globalRequestInterceptors, globalRequestConfig } from "./types";

class globalRequest {
  instance: AxiosInstance;
  interceptors?: globalRequestInterceptors;

  constructor(config: globalRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    // 接收实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加通用拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return error;
      }
    );

    this.instance.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        return error;
      }
    );
  }

  request(config: globalRequestConfig): void {
    // 单个请求拦截器
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config);
    }
    this.instance.request(config).then((res) => {
      console.log(res);
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res);
      }
    });
  }
}

export default globalRequest;
