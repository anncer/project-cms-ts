const { defineConfig } = require("@vue/cli-service");

// import config from "./config";

const path = require("path");

const BASE_URL = process.env.NODE_ENV === "development" ? "/" : "/";

// const port = 3000; // dev port

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: BASE_URL,
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
  //   name: config.name,
  //   resolve: {
  //     alias: {
  //       // "@": resolve("src"),
  //       _c: resolve("src/components")
  //     }
  //   }
  // }
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("components", "@/components");
  }
});
