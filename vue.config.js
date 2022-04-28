"use strict";
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
// 网页标题
const name = process.env.VUE_APP_TITLE;

module.exports = {
  lintOnSave: false, //设置是否在开发环境下每次保存代码时都启用 eslint验证
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        // 设置@/的意义
        "@": resolve("src"),
      },
    },
  },
  //修改端口号
  devServer: {
    port: 8888,
    proxy: {
      "/api": {
        target: "http://localhost:8889/", // 实际跨域请求的API地址
        secure: false, // https请求则使用true
        ws: true,
        changeOrigin: true, // 跨域
        // 请求地址重写  http://front-end/api/login ⇒ http://api-url/login
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
