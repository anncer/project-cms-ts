<template>
  <div class="login" v-loading="loading">
    <img :src="bg" class="wave" />
    <div class="login-container">
      <div class="img">
        <img :src="currentWeek" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <img class="avatar" :src="avatarSvg" />
          <h2>人员数据中台</h2>
          <div class="input-group user">
            <div class="icon">
              <i class="el-icon-user-solid"></i>
            </div>
            <div>
              <h5>手机号</h5>
              <input
                type="text"
                class="input"
                v-model="loginForm.username"
                @focus="onUserFocus"
                @blur="onUserBlur"
              />
            </div>
          </div>
          <div class="error-item">{{ userErr }}</div>
          <div class="input-context clearfix">
            <div class="input-group pwd">
              <div class="icon">
                <i class="el-icon-lock"></i>
              </div>
              <div>
                <h5>验证码</h5>
                <input
                  type="password"
                  class="input"
                  v-model="loginForm.password"
                  @keydown.enter="onLogin"
                  @focus="onPwdFocus"
                  @blur="onPwdBlur"
                />
              </div>
            </div>
            <el-button
              type="primary"
              :disabled="pwdDisabled"
              :class="['virify-btn']"
              @click="handleVirify"
            >
              {{ viewText }}
            </el-button>
          </div>
          <div class="error-item">{{ pwdErr }}</div>
          <button class="btn" @click="onLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addClass, removeClass } from "@/utils/dom";
// import { getVerifyCode } from "@/api/login.js";

const bg = require("./img/bg.png");
const avatarSvg = require("@/assets/images/logo-unload.svg");

const illustration0 = require("./img/illustration0.svg");
const illustration1 = require("./img/illustration1.svg");
const illustration2 = require("./img/illustration2.svg");
const illustration3 = require("./img/illustration3.svg");
const illustration4 = require("./img/illustration4.svg");
const illustration5 = require("./img/illustration5.svg");
const illustration6 = require("./img/illustration6.svg");
import encrypt from "@/utils/encrypt";
// import { mapGetters } from "vuex";
import { defineComponent, reactive, ref, onMounted } from "vue";
/* eslint-disable no-empty */
export default defineComponent({
  setup() {
    const loginForm = reactive({
      username: "",
      password: ""
    });

    const defaultVirifyTime = 60;

    let timer: any;
    let currentVirifyTime = defaultVirifyTime;

    let loading = ref(false);
    let pwdDisabled = ref(true);

    let userErr = ref("");
    let pwdErr = ref();
    let viewText = ref();
    const defaultText = ref("发送到即时通讯");

    const setBg = () => {
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

    const checkTime = () => {
      const lgUserName = localStorage.getItem("lgUserName");
      if (lgUserName) {
        loginForm.username = lgUserName;
      }
      viewText = defaultText;
      currentVirifyTime = defaultVirifyTime;
      const virifySendTime = localStorage.getItem("virifySendTime");
      if (!virifySendTime) {
        pwdDisabled = ref(false);
        return;
      }
      const now = new Date().getTime();
      const lessTime = division(sub(now, Number(virifySendTime)), 1000);
      if (lessTime < defaultVirifyTime) {
        pwdDisabled = ref(true);
        currentVirifyTime = Math.floor(sub(defaultVirifyTime, lessTime));
        viewText = ref(currentVirifyTime);
        setVirifyTimer();
      } else {
        pwdDisabled = ref(false);
      }
    };

    const division = (arg1: number, arg2: number): number => {
      let t1 = 0;
      let t2 = 0;
      try {
        t1 = arg1.toString().split(".")[1].length;
      } catch (e) {}
      try {
        t2 = arg2.toString().split(".")[1].length;
      } catch (e) {}
      const r1 = Number(arg1.toString().replace(".", ""));
      const r2 = Number(arg2.toString().replace(".", ""));
      return (r1 / r2) * Math.pow(10, t2 - t1);
    };

    const sub = (arg1: number, arg2: number): number => {
      let r1, r2;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      const m = Math.pow(10, Math.max(r1, r2));
      // 动态控制精度长度
      const n = r1 >= r2 ? r1 : r2;

      const res = ((arg1 * m - arg2 * m) / m).toFixed(n);
      return Number(res);
    };

    const checkPhone = (): boolean => {
      userErr = ref(!loginForm.username ? "请输入手机号" : "");
      userErr = ref(loginForm.username.length < 11 ? "请输入正确的手机号" : "");
      return !userErr.value;
    };

    const cleckFormData = (): boolean => {
      userErr = ref(!loginForm.username ? "请输入手机号" : "");
      userErr = ref(loginForm.username.length < 11 ? "请输入正确的手机号" : "");
      pwdErr = ref(!loginForm.password ? "请输入密码" : "");
      return !userErr.value && !pwdErr.value;
    };

    const setVirifyTimer = () => {
      if (timer) {
        clearInterval(timer);
      } else {
        timer = setInterval(() => {
          currentVirifyTime = currentVirifyTime - 1;
          viewText = ref(currentVirifyTime);
          if (!currentVirifyTime) {
            clearInterval(timer);
            viewText = ref(defaultText);
            pwdDisabled = ref(false);
          }
        }, 1000);
      }
    };

    const handleVirify = (): void => {
      if (!checkPhone()) {
        return;
      }
      // getVerifyCode(loginForm.username)
      //   .then((res) => {
      //     if (!res.data) {
      //       // $msg("error", "验证码发送失败！");
      //     } else {
      //       localStorage.setItem("virifySendTime", new Date().getTime().toString());
      //       // $msg("验证码发送成功！");
      //       pwdDisabled = ref(true);
      //       setVirifyTimer();
      //     }
      //   })
      //   .catch(() => {
      //     // $msg("error", "验证码发送失败！");
      //   });
    };

    const setRedirect = () => {
      //   const redirect = $route.query.redirect;
      //   loading = false;
      //   redirect
      //     ? $router.push(redirect)
      //     : $router.push({ name: "home" });
    };

    const onLogin = () => {
      const flag = cleckFormData();
      if (!flag) {
        return;
      }
      loading = ref(true);
      const formData = {
        username: loginForm.username,
        code: loginForm.password
      };
      const _TOKEN = encrypt(formData);
      console.log(_TOKEN, "_TOKEN");
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

    const goNext = () => {
      setRedirect();
      loading = ref(false);
    };

    const checkUserVal = () => {
      if (!checkPhone()) {
        removeClass(document.querySelector(".user"), "focus");
      } else {
        addClass(document.querySelector(".user"), "focus");
      }
    };

    const checkPwdVal = () => {
      if (loginForm.password.length === 0) {
        removeClass(document.querySelector(".pwd"), "focus");
      } else {
        addClass(document.querySelector(".pwd"), "focus");
      }
    };

    const onUserFocus = () => {
      addClass(document.querySelector(".user"), "focus");
    };

    const onUserBlur = () => {
      if (loginForm.username.length) {
        localStorage.setItem("lgUserName", loginForm.username);
      }
      checkUserVal();
    };

    const onPwdFocus = () => {
      addClass(document.querySelector(".pwd"), "focus");
    };

    const onPwdBlur = () => {
      checkPwdVal();
    };
    let currentWeek;

    onMounted(() => {
      currentWeek = ref(setBg());
      checkTime();
      checkUserVal();
      checkPwdVal();
    });

    return {
      bg,
      avatarSvg,
      loginForm,
      loading,
      pwdDisabled,
      userErr,
      pwdErr,
      viewText,
      onLogin,
      onPwdBlur,
      onPwdFocus,
      onUserBlur,
      onUserFocus,
      goNext,
      handleVirify,
      currentWeek
    };
  }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
.input-context {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  .input-group {
    flex: 1;
  }
  .virify-btn {
    height: 40px;
    margin-top: 20px;
    padding: 8px 10px;
    width: 120px;
    margin-left: 10px;
  }
}
</style>
