import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface globalRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

export interface globalRequestConfig extends AxiosRequestConfig {
  interceptors?: globalRequestInterceptors;
}
