import { AxiosRequestConfig } from "axios";
// AxiosResponse
export interface globalRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: any) => any;
  responseInterceptorCatch?: (error: any) => any;
}

export interface globalRequestConfig extends AxiosRequestConfig {
  interceptors?: globalRequestInterceptors;
  loading?: boolean;
}

export interface qeeueItem {
  fullscreen: boolean;
  lock: boolean;
  visible: boolean;
  target: HTMLElement;
  beforeClose?: () => boolean;
  closed?: () => void;
}
