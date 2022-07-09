import globalRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

const Api = new globalRequest({
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
    },
    responseInterceptorCatch: (error) => {
      return error;
    }
  }
});

export default Api;
