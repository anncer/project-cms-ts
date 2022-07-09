import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import elementPlus from "element-plus";
import "element-plus/dist/index.css";

import "normalize.css";

import Api from "./service";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(elementPlus);
app.mount("#app");

Api.request({
  url: "/home/multidata",
  method: "GET"
}).then((res) => {
  console.log(res);
});
