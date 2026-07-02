import{m as e,b as t,j as s,Q as r}from"./index.24626119.js";
const n=t({
  name:"ErrorPage",
  setup(){
    const a=()=>document.body&&document.body.classList.add("simple-404-page");
    const i=()=>document.body&&document.body.classList.remove("simple-404-page");
    const c=()=>{
      a();
      document.querySelectorAll("header,footer,.lingtu-layout-header,.fixed.w-full.h-48px.bg-white.z-500.flex").forEach(d=>d.remove())
    };
    c();
    s(c);
    r(i);
    const o=()=>{location.href="/workspace"};
    return()=>e("main",{class:"simple-404"},[
      e("div",{class:"simple-404__code"},"404"),
      e("button",{class:"simple-404__button",type:"button",onClick:o},"返回首页")
    ])
  }
});
export{n as default};
