const svgCaptcha = require("svg-captcha");
// 定义生成验证码函数
function createCode() {
  const colorMap = [
    "#eeeeee",
    "#edfedf",
    "#eeddff",
    "skyblue",
    "orange",
    "#c8c8c8",
  ]; // 配置背景图片颜色集合
  const randomColor = colorMap[Math.floor(Math.random() * colorMap.length)]; //随机颜色
  const options = {
    size: 4, // 验证码长度
    ignoreChars: "0oO1lI", // 排除字符
    noise: 2, // 干扰条数
    width: 160,
    height: 40,
    fontSize: 50,
    color: true,
    background: randomColor,
  };
  const captcha = svgCaptcha.create(options);
  return captcha;
}

module.exports = createCode;
