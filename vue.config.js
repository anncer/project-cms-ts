const { defineConfig } = require("@vue/cli-service");

// import config from "./config";

const path = require("path");

const BASE_URL = process.env.NODE_ENV === "development" ? "/" : "/";

const port = 3000; // dev port

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: BASE_URL,
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    overlay: {
      warnings: false,
      errors: true
    },
    host: "0.0.0.0",
    proxy: {
      "^/api": {
        target: "http://10.28.87.33:30717",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    // devtool: process.env.NODE_ENV === "development" ? "source-map" : "",
    // name: config.name,
    resolve: {
      alias: {
        // "@": resolve("src"),
        _c: path.resolve("src/components")
      }
    }
  },
  chainWebpack: (config) => {
    // 内置的 svg Rule 添加 exclude
    config.module
      .rule("svg")
      .exclude.add(/iconsvg/)
      .end();

    // 添加 svg-sprite-loader Rule
    config.module
      .rule("svg-sprite-loader")
      .test(/.svg$/)
      .include.add(/iconsvg/)
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader");

    // 添加 svgo Rule
    config.module
      .rule("svgo")
      .test(/.svg$/)
      .include.add(/iconsvg/)
      .end()
      .use("svgo-loader")
      .loader("svgo-loader")
      .options({
        // externalConfig 配置特殊不是相对路径，起始路径是根目录
        externalConfig: "./src/assets/iconsvg/svgo.yml"
      });
  }
});
