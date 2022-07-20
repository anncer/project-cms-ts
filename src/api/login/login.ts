import Api from "@/service";
import { IBaseRequest, ILoginUser } from "./types.d";

export const userLogin = (token: string) => {
  return Api.request<IBaseRequest<string>>({
    url: "api/security/auth/login",
    method: "post",
    headers: {
      Authorization: token
    }
  });
};

export const getVerifyCode = (mobile: string, method = "IM") => {
  return Api.request<IBaseRequest<boolean>>({
    url: "api/security/verification/code/send",
    method: "post",
    data: {
      mobile,
      method
    }
  });
};

export const getUserInfo = () => {
  return Api.get<IBaseRequest<ILoginUser>>({
    url: "api/supplier/profiles/basic"
  });
};
