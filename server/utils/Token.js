const jwt = require("jsonwebtoken");
// 密钥
const secret = "gyf";

//   设置token
function setToken(parameters) {
  const time = Date.now();
  payload = {
    parameters,
    time,
  };
  let token = jwt.sign(payload, secret, {
    expiresIn: "1h", //到期时间7d(7天) 12h  120=120ms 提供三种单位
    issuer: "gyf", //发行人
  });
  return token;
}

// 验证token
function verToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if (!token) {
        reject({ code: 502, msg: "非法请求" });
        return;
      }
      // 验证是否正确
      if (err) {
        reject({ code: 502, msg: "token 验证失败" });
        return;
      }
      // data为token解析后数据，包括payload中属性和有效时间等
      const beforeTime = data.ctime + data.exps;
      const nowTime = Date.now();
      if (nowTime > beforeTime) {
        // 比对当前时间戳  jwt创建的时间+有效期  前端收到重新获取token
        reject({ code: 502, msg: "token 过期" });
        return;
      }
      resolve(data);
    });
  });
}

module.exports = { setToken, verToken };
