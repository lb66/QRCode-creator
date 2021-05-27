import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({
  plugins: [vue()],
  server:{
    host: '0.0.0.0',
    // 代理
    proxy: {
        '/api': {    //将https://api.weixin.qq.com印射为/apis
          target: 'https://api.weixin.qq.com',  // 接口域名
          secure: false,  // 如果是https接口，需要配置这个参数
          changeOrigin: true,  //是否跨域
          rewrite: (path) => path.replace(/^\/api/, '')  }
      }
  }
})
