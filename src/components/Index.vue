<template>
  <div class="container">
    <div>appid:<input v-model="form.appid" /></div>
    <div>secret:<input v-model="form.secret" /></div>
    <div>scene:<input v-model="form.scene" /></div>
    <div>width:<input v-model="form.width" />px</div>
    <div>auto_color:</div>
    <div>is_hyaline:</div>
    <button @click="onCreate" class="btn">生成</button>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

let form = reactive({
  appid: "wx3bed0936cdac7888",
  secret: "ecbbd0b0eab94e0c310e639e9ec7f047",
  scene: "123",
  width: 280,
  auto_color: true,
  is_hyaline: false,
});
let access_token = ref("");

const onCreate = () => {
  console.log(form.appid);
  axios
    .get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${form.appid}&secret=${form.secret}`
    )
    .then(function (response) {
      console.log(response.access_token);
      access_token.value = response.access_token;
      axios.post(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token.value}`,JSON.parse(JSON.stringify(form)))
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

<style scoped>
.container {
  padding: 40px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
}
.btn {
  width: 80px;
  height: 40px;
}
</style>
