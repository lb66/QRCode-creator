import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import {ROOT,PROXYROOT} from './src/config'
// const regExp = new RegExp(`\\${ROOT}`, 'g');
export default defineConfig({
  // base: "/QRCode-creator-web/",
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        }
      ]
    })
  ],
  server: {
    hostname: '0.0.0.0',
    // 代理
    proxy: {
      '/apis': {    //将https://api.weixin.qq.com印射为/apis
        target: PROXYROOT,  // 接口域名
        secure: false ,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        rewrite: (path) => path.replace(/^\/apis/, '')
      }
    }
  },

})
