<template>
  <div class="container">
    <div class="row">
      <span class="text">appid :</span> <el-input v-model="form.appid" />
    </div>
    <div class="row">
      <span class="text">secret :</span><el-input v-model="form.secret" />
    </div>
    <div class="row">
      <span class="text">scene :</span
      ><el-input
        type="textarea"
        autosize
        v-model="form.scene"
        placeholder="多个参数用分号 ; 隔开，不支持中文"
      />
    </div>
    <div class="row">
      <div class="row-part">
        <span class="text">宽度 :</span
        ><el-input-number
          v-model="form.width"
          controls-position="right"
          :min="280"
          :max="1280"
        ></el-input-number>
      </div>
      <div class="row-part">
        <span class="text2">自动颜色 :</span
        ><el-checkbox v-model="form.auto_color" />
      </div>
      <div class="row-part">
        <span class="text2">透明底色 :</span
        ><el-checkbox v-model="form.is_hyaline" />
      </div>
    </div>
    <div>
      <el-button type="primary" @click="onCreate" :disabled="!form.scene"
        >生成
      </el-button>
      <el-button @click="onBatchDownload" :disabled="arrayBuffers.length <= 0"
        >打包下载
      </el-button>
    </div>
    <div class="result">
      <div
        class="img-wrapper"
        v-for="(item, index) in imgbase64Array"
        :key="index"
      >
        <img
          class="img"
          :style="{ width: form.width / 2 + 'px' }"
          :src="item"
          :alt="sceneArray[index]"
        />
        <div>{{ sceneArray[index] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { ElLoading } from "element-plus";
import { ElMessage } from "element-plus";
import {ROOT} from '../config'

let form = reactive({
  appid: "",
  secret: "",
  scene: "",
  width: 280,
  auto_color: false,
  is_hyaline: false,
});
let access_token = "";
let imgbase64Array = ref([]);
let sceneArray = ref([]);
let arrayBuffers = ref([]);

onMounted(() => {
  form.appid = localStorage.getItem("appid");
  form.secret = localStorage.getItem("secret");
});

const onCreate = () => {
  localStorage.setItem("appid", form.appid);
  localStorage.setItem("secret", form.secret);
  let loadingInstance = ElLoading.service({
    fullscreen: true,
    background: "rgba(0,0,0,0.6)",
    text: "拼命生成中...",
  });

  imgbase64Array.value = [];
  arrayBuffers.value = [];
  sceneArray.value = form.scene.split(";");
  axios
    .get(
      `${ROOT}/cgi-bin/token?grant_type=client_credential&appid=${form.appid}&secret=${form.secret}`
    )
    .then(function (response) {
      if (response.data.errcode) {
        loadingInstance.close();
        ElMessage.error({
          message:
            "错误码 : " +
            response.data.errcode +
            " " +
            response.data.errmsg.split(",")[0],
        });
        return;
      }
      let promiseArr = [];
      access_token = response.data.access_token;
      sceneArray.value.map((item) => {
        let promise = new Promise((resolve, reject) => {
          axios({
            url: `${ROOT}/wxa/getwxacodeunlimit?access_token=${access_token}`,
            data: {
              scene: item,
              width: form.width,
              auto_color: form.auto_color,
              is_hyaline: form.is_hyaline,
            },
            method: "post",
            responseType: "arraybuffer", //把返回的buffer转为arraybuffer
          })
            .then((res) => {
              console.log(res);
              let imgbase64 = arrayBufferToBase64Img(res.data);
              imgbase64Array.value.push(imgbase64);
              arrayBuffers.value.push(res.data);
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject();
            });
        });
        promiseArr.push(promise);
      });
      Promise.all(promiseArr) //二维码全部成功生成时
        .then((res) => {
          ElMessage.success({ message: "二维码生成成功！" });
          loadingInstance.close();
        });
    });
};

//arrayBuffer转化为base64字符串
const arrayBufferToBase64Img = (arraybuffer) => {
  const str = String.fromCharCode(...new Uint8Array(arraybuffer));
  return `data:image/png;base64,${window.btoa(str)}`;
};

// 批量打包下载
const onBatchDownload = async () => {
  let loadingInstance = ElLoading.service({
    fullscreen: true,
    background: "rgba(0,0,0,0.6)",
  });
  const zip = new JSZip();
  const cache = {};
  await arrayBuffers.value.forEach((item, index) => {
    let file_name = sceneArray.value[index]; // 获取文件名
    if (file_name.indexOf(".png") == -1) {
      file_name = file_name + ".png";
    }
    zip.file(file_name, item, {
      binary: true,
    }); // 逐个添加文件
    cache[file_name] = item;
    console.log(index);
  });
  zip
    .generateAsync({
      type: "blob",
    })
    .then((content) => {
      console.log("打包完成");
      loadingInstance.close();
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
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.text {
  width: 60px;
}
.text2 {
  margin-right: 10px;
}
.row-part {
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.result {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
}
.img-wrapper {
  margin-bottom: 10px;
  margin-right: 10px;
  text-align: center;
}
</style>
