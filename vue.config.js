const { defineConfig } = require("@vue/cli-service");

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const BASE_URL = process.env.NODE_ENV === "development" ? "/" : "/";

const name = "人员数据中台"; // page title

const port = 3000; // dev port

module.exports = defineConfig({
  transpileDependencies: true
  // publicPath: BASE_URL,
  // assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === "development",
  // productionSourceMap: false,
  // devServer: {
  //   port: port,
  //   overlay: {
  //     warnings: false,
  //     errors: true,
  //   },
  //   host: "0.0.0.0",
  // },
  // configureWebpack: {
  //   devtool: process.env.NODE_ENV === "development" ? "source-map" : "",
  //   name: name,
  //   resolve: {
  //     alias: {
  //       "@": resolve("src"),
  //       _c: resolve("src/components"),
  //     },
  //   },
  // }
});
