import{_ as G,b as L,r as y,K as U,aF as P,o as k,h as w,N as C,l as i,n as c,m as E,f as m,ag as W,b$ as R,J as b,ev as D,k as x,F as O,p as V,eN as j,t as A,q as H,O as _,a1 as Q,eL as M}from"./index.24626119.js";/* empty css               *//* empty css               */import{g as T}from"./img.ff97c383.js";import{b as I}from"./uuid.2b29000c.js";import{c as X}from"./handle-dpi.f9f543f8.js";import{Q as Y}from"./QuestionCircleOutlined.b4ffd3f2.js";import{I as q}from"./index.73e8338c.js";import{S as z}from"./index.e789a234.js";import"./UpOutlined.7fd9e20d.js";function $(s=2){const l=s===2?"":`-${s}`;if(document.getElementById("svg-stroke-filter"+l))return{white:`strokeFilterWhite${l}`,black:`strokeFilterBlack${l}`};const r=`
    <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" id="svg-stroke-filter${l}">
      <defs>
        <filter id="strokeFilterWhite${l}">
          <!-- \u4F7F\u7528feMorphology\u6269\u5C55\u8FB9\u7F18 -->
          <feMorphology
            operator="dilate"
            radius="${s}"
            in="SourceAlpha"
            result="expandedEdges"
          />
          <!-- \u4F7F\u7528feGaussianBlur\u6A21\u7CCA\u5904\u7406\u8FB9\u7F18 -->
          <feGaussianBlur
            in="expandedEdges"
            stdDeviation="${s}"
            result="blurredEdges"
          />

          <!-- \u4F7F\u7528feColorMatrix\u8C03\u6574\u989C\u8272 -->
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 255
                    0 1 0 0 255
                    0 0 1 0 255
                    0 0 0 100 -10"
            in="blurredEdges"
            result="coloredEdges"
          />
          <!-- \u4F7F\u7528feMerge\u5C06\u539F\u59CB\u56FE\u50CF\u4E0E\u8C03\u6574\u540E\u7684\u8FB9\u7F18\u5408\u5E76 -->
          <feMerge>
            <feMergeNode in="coloredEdges" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="strokeFilterBlack${l}">
          <!-- \u4F7F\u7528feMorphology\u6269\u5C55\u8FB9\u7F18 -->
          <feMorphology
            operator="dilate"
            radius="${s}"
            in="SourceAlpha"
            result="expandedEdges"
          />
          <!-- \u4F7F\u7528feGaussianBlur\u6A21\u7CCA\u5904\u7406\u8FB9\u7F18 -->
          <feGaussianBlur
            in="expandedEdges"
            stdDeviation="${s}"
            result="blurredEdges"
          />

          <!-- \u4F7F\u7528feColorMatrix\u8C03\u6574\u989C\u8272 -->
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 100 -10"
            in="blurredEdges"
            result="coloredEdges"
          />
          <!-- \u4F7F\u7528feMerge\u5C06\u539F\u59CB\u56FE\u50CF\u4E0E\u8C03\u6574\u540E\u7684\u8FB9\u7F18\u5408\u5E76 -->
          <feMerge>
            <feMergeNode in="coloredEdges" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>`,n=new DOMParser().parseFromString(r,"image/svg+xml");return document.body.appendChild(n.documentElement),{white:`strokeFilterWhite${l}`,black:`strokeFilterBlack${l}`}}function J(){if(document.getElementById("svg-invert-filter"))return;const r=new DOMParser().parseFromString(`
    <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" id="svg-invert-filter">
      <defs>
        <!-- \u8BE5\u6EE4\u955C\u4EC5\u4FDD\u7559RGB\u5404\u901A\u9053\u504F\u5DEE\u5C0F\u4E8E10\u7684\u90E8\u5206 -->
        <filter id="invertFilter">
          <!-- \u521B\u5EFA\u989C\u8272\u53CD\u8F6C -->
          <feComponentTransfer in="SourceGraphic" result="invertedBefore">
            <feFuncR type="table" tableValues="1 0" />
            <feFuncG type="table" tableValues="1 0" />
            <feFuncB type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feColorMatrix
            in="invertedBefore"
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0      0      0      1 0"
            result="invertedAfter"
          />

          <!-- 1. \u5C06\u539F\u56FE\u8F6C\u6362\u4E3A\u7070\u5EA6\u56FE -->
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0      0      0      1 0"
            result="gray"
          />

          <!-- 2. \u8BA1\u7B97\u539F\u56FE\u4E0E\u7070\u5EA6\u56FE\u7684\u5DEE\u503C -->
          <feBlend
            in="gray"
            in2="SourceGraphic"
            mode="difference"
            result="diff"
          />

          <!-- 3. \u8BA1\u7B97\u6BCF\u4E2A\u901A\u9053\u662F\u5426\u5927\u4E8E50\uFF080.196\uFF09\uFF0C\u5E76\u5728\u6B64\u57FA\u7840\u4E0A\u6784\u5EFA\u63A9\u819C -->
          <feComponentTransfer in="diff" result="mask">
            <!-- \u5982\u679C R \u901A\u9053\u7684\u503C\u5927\u4E8E20\uFF0C\u8F93\u51FA 1 -->
            <!-- \u5982\u679C B \u901A\u9053\u7684\u503C\u5927\u4E8E20\uFF0C\u8F93\u51FA 1 -->
            <!-- \u5982\u679C G \u901A\u9053\u7684\u503C\u5927\u4E8E20\uFF0C\u8F93\u51FA 1 -->
            <feFuncR type="linear" slope="1.0851" intercept="-0.0851" />
            <feFuncG type="linear" slope="1.0851" intercept="-0.0851" />
            <feFuncB type="linear" slope="1.0851" intercept="-0.0851" />
            <!-- \u5982\u679C Alpha \u901A\u9053\u7B26\u5408\u6761\u4EF6\uFF0C\u4E5F\u8F93\u51FA 1 -->
            <feFuncA type="table" tableValues="0 1" />
          </feComponentTransfer>
          <feColorMatrix
            in="mask"
            type="matrix"
            values="
            0     0     0     0  0
            0     0     0     0  0
            0     0     0     0  0
            0.3333 0.3333 0.3333 0  0"
            result="maskSum"
          />
          <!-- \u4F7F\u7528feGaussianBlur\u6A21\u7CCA\u5904\u7406\u8FB9\u7F18 -->
          <feGaussianBlur in="maskSum" stdDeviation="2" result="finalMask2" />
          <feComponentTransfer in="maskSum" result="finalMask1">
            <feFuncA type="linear" slope="100" intercept="0" />
          </feComponentTransfer>

          <feMerge result="finalMask">
            <feMergeNode in="finalMask1" />
            <feMergeNode in="finalMask2" />
          </feMerge>

          <!-- 4. \u5C06\u8499\u677F\u4F5C\u7528\u5728\u539F\u56FE\u4E0A -->
          <feComposite
            in="SourceGraphic"
            in2="finalMask"
            operator="in"
            result="finalResult"
          />
          <feComposite
            in="invertedAfter"
            in2="finalMask"
            operator="out"
            result="inverted"
          />

          <!-- \u6DF7\u5408\u539F\u59CB\u56FE\u50CF\u548C\u53CD\u8F6C\u7ED3\u679C -->
          <feMerge>
            <feMergeNode in="finalResult" />
            <feMergeNode in="inverted" />
          </feMerge>
        </filter>
      </defs>
    </svg>`,"image/svg+xml");document.body.appendChild(r.documentElement)}function K(s){const l=s.width,r=s.height,t=s.data;let n=l,o=r,F=0,v=0;for(let e=0;e<r;e++)for(let d=0;d<l;d++)t[(e*l+d)*4+3]!==0&&(n=Math.min(n,d),o=Math.min(o,e),F=Math.max(F,d),v=Math.max(v,e));const f=F-n+1,g=v-o+1;if(f<=0||g<=0)return{imageData:null,offset:{x:0,y:0}};const u=new ImageData(f,g),a=u.data;for(let e=o;e<=v;e++)for(let d=n;d<=F;d++){const p=(e*l+d)*4,h=((e-o)*f+(d-n))*4;a[h]=t[p],a[h+1]=t[p+1],a[h+2]=t[p+2],a[h+3]=t[p+3]}return{imageData:u,offset:{x:n,y:o}}}async function Z(s){const{img:l}=await T(s),r=document.createElement("canvas"),t=r.getContext("2d");r.width=l.width,r.height=l.height,t.drawImage(l,0,0);const n=t.getImageData(0,0,l.width,l.height),{imageData:o}=K(n);return o?(r.width=o.width,r.height=o.height,t.putImageData(o,0,0),r.toDataURL()):null}async function S(s,l){try{const{filter:r,trimTransparent:t,strokeWidth:n=2}=l;if(!r&&!t)return s;const{img:o,width:F,height:v}=await T(s),f=document.createElement("canvas"),g=f.getContext("2d");let u=r?.includes("stroke")?n:0;switch(f.width=F+u*2,f.height=v+u*2,r){case"stroke-white":const{white:e}=$(n);g.filter=`url('#${e}')`;break;case"stroke-black":const{black:d}=$(n);g.filter=`url('#${d}')`;break;case"invert":J(),g.filter="url('#invertFilter')";break}g.drawImage(o,u,u,F,v);let a=f.toDataURL("image/png");return t&&(a=await Z(a)),a}catch{return""}}const ee="_Dialog_15vmo_1",te="_DownloadTabs_15vmo_4",ue="_Title_15vmo_11",ae="_Items_15vmo_14",le="_Item_15vmo_14",re="_Label_15vmo_25",se="_Container_15vmo_33",ne="_ErrorContent_15vmo_40",oe="_ErrorFooter_15vmo_44",ie="_Text_15vmo_51",de="_Select_15vmo_55",fe="_SelectItem_15vmo_58",ce="_TextSuccess_15vmo_66",me="_errorContent_15vmo_69",pe="_ErrorImages_15vmo_72",Fe="_Footer_15vmo_79";var ve={Dialog:ee,DownloadTabs:te,Title:ue,Items:ae,Item:le,Label:re,Container:se,ErrorContent:ne,ErrorFooter:oe,Text:ie,Select:de,SelectItem:fe,TextSuccess:ce,errorContent:me,ErrorImages:pe,Footer:Fe};const ge={class:"flex gap-8px"},Ce={class:"w-300px h-300px flex justify-center items-center mb-16px"},Ee=["src"],he=i("br",null,null,-1),be=L({__name:"modal",props:{url:null,visible:{type:Boolean}},emits:["update:visible","cancel","ok"],setup(s,{emit:l}){const r=s,t=y({dpi:null,strokeWidth:2,filter:null,trimTransparent:!1}),n=y(r.url);U(()=>t.value,async()=>{v()},{deep:!0});const o=y(!1);async function F(){o.value=!0,!t.value.filter&&!t.value.trimTransparent?n.value=r.url:n.value=await S(r.url,{filter:t.value.filter,strokeWidth:t.value.strokeWidth,trimTransparent:t.value.trimTransparent}),o.value=!1}const v=P(F,200),f=y(!1);async function g(){let u="\u539F\u56FE",a=r.url;try{switch(f.value=!0,a=await S(r.url,{filter:t.value.filter,strokeWidth:t.value.strokeWidth,trimTransparent:t.value.trimTransparent}),t.value.filter){case"stroke-white":u="\u767D\u8272\u63CF\u8FB9";break;case"stroke-black":u="\u9ED1\u8272\u63CF\u8FB9";break;case"invert":u="\u53CD\u8F6C\u56FE\u50CF";break}if(t.value.dpi){let e=a.substring(a.lastIndexOf("/")+1,a.length),p=await(await fetch(a)).blob();const h=e?.split(".")[1]?.split("?")[0],B=await X(p,t.value.dpi,`image/${h}`);p=B.blob,e=e.replace(h,B.type.replace("image/",""));const N=new File([p],e,{type:p.type});M({url:URL.createObjectURL(N),fileName:`${u}-${I()}.png`})}else M({url:a,fileName:`${u}-${I()}.png`});l("update:visible",!1)}finally{f.value=!1}}return(u,a)=>(k(),w(m(Q),{width:552,visible:r.visible,"onUpdate:visible":a[5]||(a[5]=e=>l("update:visible",e)),footer:null,wrapClassName:u.$style.Dialog,keyboard:!1,closable:!1,maskClosable:!1},{title:C(()=>[i("div",{class:c(u.$style.Title)},"\u4E0B\u8F7D\u9009\u9879",2)]),default:C(()=>[i("div",ge,[E(m(W),{spinning:o.value},{default:C(()=>[i("div",Ce,[i("img",{src:n.value,class:"max-w-full max-h-full"},null,8,Ee)])]),_:1},8,["spinning"]),i("div",{class:c(u.$style.Items)},[i("div",{class:c(u.$style.Item)},[i("div",{class:c(u.$style.Label)},[E(m(R),{placement:"top"},{content:C(()=>[b(" DPI\u51B3\u5B9A\u5370\u82B1\u7CBE\u5EA6\uFF0C\u6839\u636E\u6253\u5370\u673A\u652F\u6301\u7684DPI "),he,b(" \u9009\u62E9\u4EE5\u786E\u4FDD\u6700\u4F73\u6548\u679C\u3002 ")]),default:C(()=>[b(" DPI "),E(m(Y),{style:{"margin-left":"4px"}})]),_:1})],2),E(m(D),{value:t.value.dpi,"onUpdate:value":a[0]||(a[0]=e=>t.value.dpi=e),"option-label-prop":"label",dropdownClassName:u.$style.Select,style:{width:"120px"}},{default:C(()=>[(k(!0),x(O,null,V([{value:null,info:"\u5C4F\u5E55\u663E\u793A\uFF0C\u7F51\u9875/\u79FB\u52A8\u7AEF"},{value:150,info:"\u666E\u901A\u6253\u5370"},{value:300,info:"\u5E38\u89C4\u6253\u5370\uFF0C\u7167\u7247/\u7B80\u6613\u63D2\u753B"},{value:600,info:"\u7CBE\u5FC3\u6253\u5370\uFF0C\u4E13\u4E1A\u6444\u5F71/\u5DE5\u7A0B\u56FE\u7EB8"},{value:1200,info:"\u8D85\u9AD8\u6E05\u6253\u5370\uFF0C\u8D27\u5E01/\u62A4\u7167"}].map(e=>({value:e.value,label:e.value?`${e.value}DPI`:"72DPI",info:e.info})),e=>(k(),w(m(j),{key:e.value,value:e.value,label:e.label},{default:C(()=>[i("div",{class:c(u.$style.SelectItem)},[i("span",null,A(e.label),1),i("span",null,A(e.info),1)],2)]),_:2},1032,["value","label"]))),128))]),_:1},8,["value","dropdownClassName"])],2),i("div",{class:c(u.$style.Item)},[i("div",{class:c(u.$style.Label)},"\u6EE4\u955C\u7C7B\u578B",2),E(m(D),{value:t.value.filter,"onUpdate:value":a[1]||(a[1]=e=>t.value.filter=e),"option-label-prop":"label",dropdownClassName:u.$style.Select,style:{width:"120px"},options:[{value:null,label:"\u539F\u56FE"},{value:"stroke-white",label:"\u767D\u8272\u63CF\u8FB9"},{value:"stroke-black",label:"\u9ED1\u8272\u63CF\u8FB9"},{value:"invert",label:"\u53CD\u8F6C\u56FE\u50CF"}]},null,8,["value","dropdownClassName"])],2),["stroke-white","stroke-black"].includes(t.value.filter)?(k(),x("div",{key:0,class:c(u.$style.Item)},[i("div",{class:c(u.$style.Label)},"\u63CF\u8FB9\u5BBD\u5EA6",2),E(m(q),{"addon-after":"px",value:t.value.strokeWidth,"onUpdate:value":a[2]||(a[2]=e=>t.value.strokeWidth=e),style:{width:"120px !important"}},null,8,["value"])],2)):H("",!0),i("div",{class:c(u.$style.Item)},[i("div",{class:c(u.$style.Label)},"\u88C1\u526A\u5230\u8FB9\u7F18",2),E(m(z),{checked:t.value.trimTransparent,"onUpdate:checked":a[3]||(a[3]=e=>t.value.trimTransparent=e)},null,8,["checked"])],2)],2)]),i("div",{class:c(u.$style.Footer)},[E(m(_),{style:{"margin-right":"4px"},onClick:a[4]||(a[4]=()=>{l("cancel"),l("update:visible",!1)})},{default:C(()=>[b(" \u53D6\u6D88 ")]),_:1}),E(m(_),{type:"primary",loading:f.value,onClick:g},{default:C(()=>[b("\u4E0B\u8F7D")]),_:1},8,["loading"])],2)]),_:1},8,["visible","wrapClassName"]))}}),ye={$style:ve};var Se=G(be,[["__cssModules",ye]]);export{Se as default};
//# sourceMappingURL=modal.641990f4.js.map
