import{m as e,b as t}from"./index.24626119.js";
const n=t({
  name:"ErrorPage",
  setup(){
    const o=()=>{location.href="/workspace"};
    return()=>e("main",{class:"simple-404"},[
      e("div",{class:"simple-404__code"},"404"),
      e("button",{class:"simple-404__button",type:"button",onClick:o},"返回首页")
    ])
  }
});
export{n as default};
