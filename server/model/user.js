const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  number: { type: Number, required: true }, // 账号（邮箱）
  password: { type: String, required: true }, // 密码（未加密）
  time: { type: Number, required: true }, // 创建时间
  age: Number, // 年龄
  name: { type: String, required: true },
  telephone: { type: Number, required: true },
  type: { type: String, required: true }, // 绑定的角色
  sex: { type: String, default: "男" }, // 性别
});

var User = mongoose.model("User", userSchema);

module.exports = User;
