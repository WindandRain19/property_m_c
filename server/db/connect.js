const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/property_m_c", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log(err, "数据库丽连接失败");
  });
  