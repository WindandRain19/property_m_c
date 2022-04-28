const express = require("express");
const loginRouter = express.Router();
const User = require("../model/user");
const { setToken } = require("../utils/Token");
const createCode = require("../utils/verification_code");

// let check_img_code
loginRouter.post("", async (req, res) => {
  const { img_code } = req.body;
  // img_code 获取传递的图片验证码 ,如果不相等，验证码错误
  console.log("req-----", req.session.img_code);
  if (img_code.trim().toLocaleUpperCase() !== req.session.img_code) {
    res.send({ msg: "验证码错误" });
    return;
  }
  let { number, password } = req.body;
  const result = await User.find({ number, password });
  if (result.length > 0) {
    let token = setToken({ number, password });
    res.send({ code: 200, msg: "登录成功", token });
  } else {
    res.send({ code: 200, msg: "账号和密码错误" });
  }
});

loginRouter.get("/get-CodeImg", (req, res) => {
  const captchaObj = createCode();
  const captchaCode = captchaObj.text.toLocaleUpperCase();
  console.log("captchaCode---", captchaCode);
  req.session.img_code = captchaCode; // 将验证码装换为大写
  res.type("svg");
  console.log(req.session);
  res.send(captchaObj.data);
});

loginRouter.get("/session/view", (req, res, next) => {
  let s = req.session;
  if (req.session.views) {
    req.session.views++;
    res.send(`views: ${req.session.views} time.`);
  } else {
    req.session.views = 1;
    res.send("views: 0");
  }
});

module.exports = loginRouter;
