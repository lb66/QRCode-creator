<template>
  <div class="container">
    <div>appid:<input v-model="form.appid" /></div>
    <div>secret:<input v-model="form.secret" /></div>
    <div>scene:<input v-model="form.scene" /></div>
    <div>width:<input v-model="form.width" />px</div>
    <div>auto_color:</div>
    <div>is_hyaline:</div>
    <button @click="onCreate" class="btn">生成</button>
    <button @click="onBatchDownload" class="btn">打包下载</button>
    <div v-for="(item, index) in imgbase64Array" :key="index">
      <img :src="item" :alt="sceneArray[index]" />
      <div>{{ sceneArray[index] }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";

let form = reactive({
  appid: "wx3bed0936cdac7888",
  secret: "ecbbd0b0eab94e0c310e639e9ec7f047",
  scene: "",
  width: 280,
  auto_color: false,
  is_hyaline: false,
});
let access_token = "";
let imgbase64Array = ref([]);
let sceneArray = ref([]);
let arrayBuffers = [];

onMounted(() => {
   form.appid=localStorage.getItem('appid')
   form.secret=localStorage.getItem('secret')
})

const onCreate = () => {
  localStorage.setItem('appid',form.appid)
  localStorage.setItem('secret',form.secret)

  imgbase64Array.value = [];
  arrayBuffers = [];
  sceneArray.value = form.scene.split(";");

  axios
    .get(
      `/api/cgi-bin/token?grant_type=client_credential&appid=${form.appid}&secret=${form.secret}`
    )
    .then(function (response) {
      access_token = response.data.access_token;
      sceneArray.value.map((item) => {
        axios({
          url: `/api/wxa/getwxacodeunlimit?access_token=${access_token}`,
          data: {
            scene: item,
            width: form.width,
            auto_color: form.auto_color,
            is_hyaline: form.is_hyaline,
          },
          method: "post",
          responseType: "arraybuffer", //把返回的buffer转为arraybuffer
        })
          .then(function (res) {
            let imgbase64 = arrayBufferToBase64Img(res.data);
            imgbase64Array.value.push(imgbase64);
            arrayBuffers.push(res.data);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

//arrayBuffer转化为base64字符串
const arrayBufferToBase64Img = (arraybuffer) => {
  const str = String.fromCharCode(...new Uint8Array(arraybuffer));
  return `data:image/png;base64,${window.btoa(str)}`;
};

// 批量打包下载
const onBatchDownload = async () => {
  const zip = new JSZip();
  const cache = {};
  await arrayBuffers.forEach((item, index) => {
    let file_name = sceneArray.value[index]; // 获取文件名
    if (file_name.indexOf(".png") == -1) {
      file_name = file_name + ".png";
    }
    zip.file(file_name, item, {
      binary: true,
    }); // 逐个添加文件
    cache[file_name] = item;
  });
  zip
    .generateAsync({
      type: "blob",
    })
    .then((content) => {
      // 生成二进制流
      FileSaver.saveAs(content, "小程序二维码.zip"); // 利用file-saver保存文件
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
