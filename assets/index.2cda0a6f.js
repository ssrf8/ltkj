import{_ as o,b as n,o as i,k as F,n as c,z as E}from"./index.24626119.js";import{o as r}from"./index.1a04439e.js";import"./modal.fb65d274.js";var D={};const d=n({__name:"index",props:{taskId:null},emits:["ok"],setup(s,{emit:u}){const e=s,{batch:t}=E;function a(){r({title:"\u786E\u5B9A\u8981\u5220\u9664?",description:`
      <ul style="list-style-type: auto;margin-left: 18px;">
        <li>\u4EFB\u52A1\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D</li>
        <li>\u5220\u9664\u4EFB\u52A1\u64CD\u4F5C\uFF0C\u4EFB\u52A1\u4E2D\u7684\u56FE\u7247\u79FB\u5165\u56DE\u6536\u7AD9,\u4FDD\u755930\u5929\u540E\u5F7B\u5E95\u5220\u9664,\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\u3002</li>
        <li>\u5F7B\u5E95\u5220\u9664\u64CD\u4F5C\uFF0C\u7CFB\u7EDF\u4E2D\u5F15\u7528\u76F8\u5173\u6587\u4EF6\u7684\u529F\u80FD\u5C06\u53D7\u5F71\u54CD,\u5982:\u5370\u82B1\u68C0\u7D22\u3001\u5546\u54C1\u5957\u56FE\u7B49</li>
      </ul>
      `,okText:"\u5220\u9664\u4EFB\u52A1",cancelText:"\u5F7B\u5E95\u5220\u9664",onOk:async()=>{await t.deleteBatch({id:e.taskId,deleted:!1}),u("ok")},onCancel:async()=>{await t.deleteBatch({id:e.taskId,deleted:!0}),u("ok")}})}return(l,B)=>(i(),F("span",{class:c(l.$style.Container),onClick:a},"\u5220\u9664",2))}}),p={$style:D};var f=o(d,[["__cssModules",p]]);export{f as default};
//# sourceMappingURL=index.2cda0a6f.js.map
