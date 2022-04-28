import request from "../utils/request";

export function Login(number, password,img_code) {
  const data = {
    number,
    password,
    img_code
  };
  return request({
    url: "/Login",
    method: "post",
    data,
  });
}

