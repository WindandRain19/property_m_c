const express = require("express");
const app = express();
const db = require("./db/connect");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
// 验证token的方法
const { verToken } = require("./utils/Token");

// 允许跨域
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:8888", // web前端服务器地址
  })
); // 解析post请求
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// 设置静态资源文件
app.use("/static", express.static(path.join(__dirname, "static")));

const loginRouter = require("./router/Login.js");
const homeRouter = require("./router/Home.js");

// 使用express-session 来存放数据到session中
app.use(
  session({
    secret: "WickYo", // 对cookie进行签名
    name: "session", // cookie名称，默认为connect.sid
    resave: false, // 强制将会话保存回会话容器
    cookie: {
      // 5分钟
      maxAge: 60 * 1000,
    },
  })
);

// 登录路由
app.use("/Login", loginRouter);

// 验证token中间件
// 这个中间件函数将为应用程序的每个请求执行
app.use(function (req, res, next) {
  const Token = req.header("Authorization");
  verToken(Token)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(err.code).send(err.msg);
    });
});

// 首页路由
app.use("/Home", homeRouter);

app.listen("8889", () => {
  console.log("端口8889已经打开");
});
