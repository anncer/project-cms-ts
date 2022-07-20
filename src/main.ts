import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./router/permission";

import elementPlus from "element-plus";

import "element-plus/dist/index.css";
import "normalize.css";
import "./styles/index.scss";

import { importWhole } from "@/components/IconSvg/index";

importWhole();

const app = createApp(App);

app.use(router);
app.use(store);
app.use(elementPlus);
app.mount("#app");
