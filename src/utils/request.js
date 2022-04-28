import axios from "axios";
import { getToken } from "../utils/Token";

axios.defaults.withCredentials = true; //携带cookie
// 创建实例对象
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000,
});

// 配置请求拦截，每一个请求都携带token
service.interceptors.request.use((config) => {
  
  config.headers["Authorization"] = getToken();

  return config;
});

export default service;
