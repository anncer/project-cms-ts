const illustration0 = require("../img/illustration0.svg");
const illustration1 = require("../img/illustration1.svg");
const illustration2 = require("../img/illustration2.svg");
const illustration3 = require("../img/illustration3.svg");
const illustration4 = require("../img/illustration4.svg");
const illustration5 = require("../img/illustration5.svg");
const illustration6 = require("../img/illustration6.svg");
import { ILoginForm, IErrorMsg } from "../type.d";
import encrypt from "@/utils/encrypt";

export const setBg = () => {
  switch (String(new Date().getDay())) {
    case "0":
      return illustration0;
    case "1":
      return illustration1;
    case "2":
      return illustration2;
    case "3":
      return illustration3;
    case "4":
      return illustration4;
    case "5":
      return illustration5;
    case "6":
      return illustration6;
    default:
      return illustration4;
  }
};

export const checkPwdVal = (loginForm: ILoginForm): boolean => {
  return Boolean(loginForm.password);
};

export const checkUserVal = (loginForm: ILoginForm, errorMsg: IErrorMsg) => {
  return checkPhone(loginForm, errorMsg);
};

export const checkPhone = (
  loginForm: ILoginForm,
  errorMsg: IErrorMsg
): boolean => {
  const isUser = Boolean(loginForm.username);
  const isUserLen = loginForm.username.length === 11;
  errorMsg.userErr = !isUser ? "请输入手机号" : "";
  errorMsg.userErr = !isUserLen ? "请输入正确的手机号" : "";

  return isUser && isUserLen;
};

export const cleckFormData = (
  loginForm: ILoginForm,
  errorMsg: IErrorMsg
): boolean => {
  const isUser = Boolean(loginForm.username);
  const isUserLen = loginForm.username.length === 11;
  const isPwd = Boolean(loginForm.password);

  errorMsg.userErr = !isUser ? "请输入手机号" : "";
  errorMsg.userErr = !isUserLen ? "请输入正确的手机号" : "";
  errorMsg.pwdErr = !isPwd ? "请输入验证码" : "";
  return isUser && isUserLen && isPwd;
};

export const onLogin = (loginForm: ILoginForm): Promise<T> => {
  const formData = {
    username: loginForm.username,
    code: loginForm.password
  };
  const _TOKEN = encrypt(formData);
  console.log(_TOKEN, "_TOKEN");
  return new Promise((resolve, reject) => {
    resolve({});
    reject("");
  });
  // this.$store
  //   .dispatch("user/login", _TOKEN)
  //   .then(() => {
  //     this.$store
  //       .dispatch("user/setUserId", false)
  //       .then(() => {
  //         console.log(this.avatar, "this.avatar");
  //         // if (this.avatar) {
  //         //   this.$store.dispatch("user/setAvatarById", this.avatar);
  //         // }
  //         this.goNext();
  //       })
  //       .catch(() => {
  //         this.goNext();
  //       });
  //   })
  //   .catch(() => {
  //     this.$msg("error", "登录失败，请重试！");
  //     this.loading = false;
  //   });
};
