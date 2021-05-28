const url = 'https://api.weixin.qq.com';

let PROXYROOT = url
let ROOT;

if (process.env.NODE_ENV === 'development') {
    //开发环境下的代理地址，解决本地跨域跨域
    ROOT = "/apis"
} else {
    //生产环境下的地址
    ROOT = url;
}

export {PROXYROOT,ROOT} ;