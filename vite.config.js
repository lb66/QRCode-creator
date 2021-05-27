import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
export default defineConfig({
  base: "/QRCode-creator-web/",
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
    host: '0.0.0.0',//监听所有地址
    // 代理
    proxy: {
      '/api': {    //将https://api.weixin.qq.com印射为/apis
        target: 'https://api.weixin.qq.com',  // 接口域名
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

})
