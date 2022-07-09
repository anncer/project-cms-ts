/* eslint-disable no-param-reassign */
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { globalRequestInterceptors, globalRequestConfig } from "./types";
import { ElLoading } from "element-plus";

const DEFAULT_LOADING = false;
class globalRequest {
  instance: AxiosInstance;
  interceptors?: globalRequestInterceptors;
  loading: boolean;
  loadingComponent?: any;
  // qeeue: Array<AxiosInstance>;

  constructor(config: globalRequestConfig) {
    this.instance = axios.create(config);
    this.loading = config.loading ?? DEFAULT_LOADING;
    this.interceptors = config.interceptors;

    // 添加通用拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 判断并显示loading
        if (this.loading) {
          this.loadingComponent = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            fullscreen: true
          });
        }

        return config;
      },
      (error) => {
        return error;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // 关闭loading
        this.loadingComponent?.close();
        // checkStatus

        return res.data;
      },
      (error) => {
        this.loadingComponent?.close();

        return error;
      }
    );
    // 实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }

  request<T>(config: globalRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 判断是否需要loading
      if (config.loading === !DEFAULT_LOADING) {
        this.loading = config.loading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 重置loading状态
          this.loading = DEFAULT_LOADING;

          resolve(res);
        })
        .catch((error) => {
          // 重置loading状态
          this.loading = DEFAULT_LOADING;
          reject(error);
          return error;
        });
    });
  }

  get<T>(config: globalRequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T>(config: globalRequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  delete<T>(config: globalRequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  patch<T>(config: globalRequestConfig): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default globalRequest;
