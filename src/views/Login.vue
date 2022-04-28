<template>
  <div class="login">
    <el-card class="box-card">
      <h3 class="title">物业管理系统</h3>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item label="用户类型">
          <el-select v-model="loginForm.type" placeholder="用户类型">
            <el-option label="业主" value="业主"></el-option>
            <el-option label="普通职员" value="普通职员"></el-option>
            <el-option label="高管" value="高管"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号:" style="width: 500px" prop="number">
          <el-input
            v-model="loginForm.number"
            placeholder="请输入账号"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" style="width: 500px" prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入账号"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item prop="img_code" label="验证码:">
          <el-input
            v-model="loginForm.img_code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 40%"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
          <div class="login-code">
            <img ref="img_codeRef" :src="codeUrl" @click="getCode" />
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.RememberMe">记住密码</el-checkbox>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loginLoading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "Login",
  data() {
    return {
      codeUrl: process.env.VUE_APP_BASE_API + "/Login/get-CodeImg",
      loginForm: {
        type: "",
        number: "",
        password: "",
        RememberMe: false,
        img_code: "",
      },
      loginLoading: false,
      loginRules: {
        number: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 14,
            message: "长度在 6 到 14 个字符",
            trigger: "blur",
          },
        ],
        img_code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getCookie();
  },
  methods: {
    // 获取原有Cookies
    getCookie() {
      const number = Cookies.get("number");
      const password = Cookies.get("password");
      const RememberMe = Cookies.get("RememberMe");
      const type = Cookies.get("type");
      this.loginForm = {
        number: number === undefined ? this.loginForm.number : number,
        password: password === undefined ? this.loginForm.password : password,
        RememberMe: RememberMe === undefined ? false : Boolean(RememberMe),
        type: type === undefined ? this.loginForm.type : type,
      };
    },
    // 提交表单数据，发起请求
    async handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.loginForm.RememberMe) {
            Cookies.set("number", this.loginForm.number, { expires: 30 });
            Cookies.set("password", this.loginForm.password, {
              expires: 30,
            });
            Cookies.set("RememberMe", this.loginForm.RememberMe, {
              expires: 30,
            });
            Cookies.set("type", this.loginForm.type, {
              expires: 30,
            });
          } else {
            Cookies.remove("number");
            Cookies.remove("password");
            Cookies.remove("RememberMe");
            Cookies.remove("type");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then((msg) => {
              console.log(msg);
              if (msg == "验证码错误") {
                alert("验证码错误");
                return;
              }
              this.$router.push("/Home");
            })
            .catch(() => {});
        }
      });
    },
    getCode() {
      this.codeUrl =
        process.env.VUE_APP_BASE_API +
        "/Login/get-CodeImg?t=" +
        new Date().getTime();
    },
  },
};
</script>

<style lang="css" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../assets/logo.png");
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
button {
  margin: 20px auto;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
}
img {
  cursor: pointer;
  vertical-align: middle;
}
</style>
