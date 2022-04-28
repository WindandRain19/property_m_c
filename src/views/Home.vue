<template>
  <div>{{ token }}</div>
</template>

<script>
import Cookies from "js-cookie";
import { Home } from "../api/Home";
export default {
  created() {
    this.getToken();
    this.getHome();
  },
  name: "Home",
  data() {
    return {
      token: "",
    };
  },
  methods: {
    getToken() {
      this.token = Cookies.get("Token");
    },
    getHome() {
      Home().then((res) => {
        console.log(res);
      })
    },
  },
};
</script>

<style></style>
