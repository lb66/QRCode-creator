import{p as e,a as n,r as t,b as a,o,c as s,d as c,w as l,v as i,u as p,e as d,D as u,f as r}from"./vendor.2fc1bcdd.js";e("data-v-2bff901a");const f={class:"container"},v=d("appid:"),b=d("secret:"),h=d("scene:"),g=d("width:"),m=d("px"),_=c("div",null,"auto_color:",-1),w=c("div",null,"is_hyaline:",-1);n();const x={expose:[],setup(e){let n=t({appid:"wx3bed0936cdac7888",secret:"ecbbd0b0eab94e0c310e639e9ec7f047",scene:"123",width:280,auto_color:!0,is_hyaline:!1}),d=a("");const r=()=>{console.log(n.appid),u.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${n.appid}&secret=${n.secret}`).then((function(e){console.log(e.access_token),d.value=e.access_token,u.post(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${d.value}`,JSON.parse(JSON.stringify(n))).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))};return(e,t)=>(o(),s("div",f,[c("div",null,[v,l(c("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>p(n).appid=e)},null,512),[[i,p(n).appid]])]),c("div",null,[b,l(c("input",{"onUpdate:modelValue":t[2]||(t[2]=e=>p(n).secret=e)},null,512),[[i,p(n).secret]])]),c("div",null,[h,l(c("input",{"onUpdate:modelValue":t[3]||(t[3]=e=>p(n).scene=e)},null,512),[[i,p(n).scene]])]),c("div",null,[g,l(c("input",{"onUpdate:modelValue":t[4]||(t[4]=e=>p(n).width=e)},null,512),[[i,p(n).width]]),m]),_,w,c("button",{onClick:r,class:"btn"},"生成")]))},__scopeId:"data-v-2bff901a"};r({expose:[],setup:e=>(e,n)=>(o(),s(x,{msg:"Hello Vue 3 + Vite"}))}).mount("#app");
