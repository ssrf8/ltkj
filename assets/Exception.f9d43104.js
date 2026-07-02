import{m as e,b as t,j as s,Q as r}from"./index.24626119.js";
const n=t({
  name:"ErrorPage",
  setup(){
    const a=()=>document.body&&document.body.classList.add("simple-404-page");
    const i=()=>document.body&&document.body.classList.remove("simple-404-page");
    let o;
    const d=()=>{
      const l=document.querySelector(".simple-404"),p=document.getElementById("app");
      if(!l||!p)return;
      for(let h=l;h&&h!==p&&h.parentElement;){
        const u=h.parentElement;
        Array.from(u.children).forEach(m=>{m!==h&&m.remove()});
        h=u
      }
      Array.from(document.body.children).forEach(h=>{h!==p&&h.remove()})
    };
    const c=()=>{
      a();
      setTimeout(d);
      o&&o.disconnect();
      document.body&&(o=new MutationObserver(d),o.observe(document.body,{childList:!0,subtree:!0}))
    };
    c();
    s(c);
    r(()=>{i();o&&o.disconnect()});
    const l=()=>{location.href="/workspace"};
    return()=>e("main",{class:"simple-404"},[
      e("div",{class:"simple-404__code"},"404"),
      e("button",{class:"simple-404__button",type:"button",onClick:l},"返回")
    ])
  }
});
export{n as default};
