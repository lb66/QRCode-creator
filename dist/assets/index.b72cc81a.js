import{p as e,a,r as l,b as n,o as s,c as t,d as o,w as d,v as i,u as c,e as u,D as p,f as r}from"./vendor.2fc1bcdd.js";e("data-v-751608a0");const v={class:"container"},b=u("appid:"),m=u("secret:"),h=u("scene:"),w=u("width:"),V=u("px"),_=o("div",null,"auto_color:",-1),f=o("div",null,"is_hyaline:",-1);a();const x={expose:[],setup(e){let a=l({appid:"wx3bed0936cdac7888",secret:"ecbbd0b0eab94e0c310e639e9ec7f047",scene:"123",width:280,auto_color:!0,is_hyaline:!1});n("");const u=()=>{p({url:"/api2/information/cPCNews"}).then((e=>{console.log(e)}))};return(e,l)=>(s(),t("div",v,[o("div",null,[b,d(o("input",{"onUpdate:modelValue":l[1]||(l[1]=e=>c(a).appid=e)},null,512),[[i,c(a).appid]])]),o("div",null,[m,d(o("input",{"onUpdate:modelValue":l[2]||(l[2]=e=>c(a).secret=e)},null,512),[[i,c(a).secret]])]),o("div",null,[h,d(o("input",{"onUpdate:modelValue":l[3]||(l[3]=e=>c(a).scene=e)},null,512),[[i,c(a).scene]])]),o("div",null,[w,d(o("input",{"onUpdate:modelValue":l[4]||(l[4]=e=>c(a).width=e)},null,512),[[i,c(a).width]]),V]),_,f,o("button",{onClick:u,class:"btn"},"生成")]))},__scopeId:"data-v-751608a0"};r({expose:[],setup:e=>(e,a)=>(s(),t(x,{msg:"Hello Vue 3 + Vite"}))}).mount("#app");