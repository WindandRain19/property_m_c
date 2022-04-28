import { Login } from "../../api/Login";
import { setToken, getToken } from "../../utils/Token";

const login = {
  state: {
    token: getToken(),
    number: "",
    username: "",
    type: "",
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      const number = userInfo.number;
      const password = userInfo.password;
      const img_code = userInfo.img_code
      return new Promise((resolve, reject) => {
        Login(number, password,img_code)
          .then((res) => {
            res = res.data;
            setToken(res.token);
            commit("SET_TOKEN", res.token);
            resolve(res.msg);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
export default login;
