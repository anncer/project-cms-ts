import globalRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

const request = new globalRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      return config;
    },
    requestInterceptorCatch: (error) => {
      return error;
    },
    responseInterceptor: (res) => {
      return res;
    }
  }
});
//  1:14:44s
export default request;
