import request from "../utils/request";

export function Home() {
  return request({
    url: "/Home",
    method: "get",
  });
}
