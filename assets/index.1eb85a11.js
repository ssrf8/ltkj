import{g as P}from"./img.ff97c383.js";import{Z as U}from"./jszip.min.71316329.js";import{F as O}from"./FileSaver.min.6ea4c02e.js";import{b as R}from"./_baseSum.7789650e.js";import{co as j}from"./index.24626119.js";var W=NaN;function Z(n,c){var r=n==null?0:n.length;return r?R(n,c)/r:W}function N(n){return Z(n,j)}var A=function(n,c){return n<c?-1:n>c?1:0},S=function(n){return n.reduce(function(c,r){return c+r},0)},K=function(){function n(r){this.colors=r}var c=n.prototype;return c.palette=function(){return this.colors},c.map=function(r){return r},n}(),X=function(){function n(e,t,a){return(e<<10)+(t<<5)+a}function c(e){var t=[],a=!1;function u(){t.sort(e),a=!0}return{push:function(o){t.push(o),a=!1},peek:function(o){return a||u(),o===void 0&&(o=t.length-1),t[o]},pop:function(){return a||u(),t.pop()},size:function(){return t.length},map:function(o){return t.map(o)},debug:function(){return a||u(),t}}}function r(e,t,a,u,o,s,p){var f=this;f.r1=e,f.r2=t,f.g1=a,f.g2=u,f.b1=o,f.b2=s,f.histo=p}function l(){this.vboxes=new c(function(e,t){return A(e.vbox.count()*e.vbox.volume(),t.vbox.count()*t.vbox.volume())})}function g(e,t){if(t.count()){var a=t.r2-t.r1+1,u=t.g2-t.g1+1,o=Math.max.apply(null,[a,u,t.b2-t.b1+1]);if(t.count()==1)return[t.copy()];var s,p,f,h,d=0,v=[],x=[];if(o==a)for(s=t.r1;s<=t.r2;s++){for(h=0,p=t.g1;p<=t.g2;p++)for(f=t.b1;f<=t.b2;f++)h+=e[n(s,p,f)]||0;v[s]=d+=h}else if(o==u)for(s=t.g1;s<=t.g2;s++){for(h=0,p=t.r1;p<=t.r2;p++)for(f=t.b1;f<=t.b2;f++)h+=e[n(p,s,f)]||0;v[s]=d+=h}else for(s=t.b1;s<=t.b2;s++){for(h=0,p=t.r1;p<=t.r2;p++)for(f=t.g1;f<=t.g2;f++)h+=e[n(p,f,s)]||0;v[s]=d+=h}return v.forEach(function(E,b){x[b]=d-E}),function(E){var b,y,m,k,w,C=E+"1",M=E+"2",F=0;for(s=t[C];s<=t[M];s++)if(v[s]>d/2){for(m=t.copy(),k=t.copy(),w=(b=s-t[C])<=(y=t[M]-s)?Math.min(t[M]-1,~~(s+y/2)):Math.max(t[C],~~(s-1-b/2));!v[w];)w++;for(F=x[w];!F&&v[w-1];)F=x[--w];return m[M]=w,k[C]=m[M]+1,[m,k]}}(o==a?"r":o==u?"g":"b")}}return r.prototype={volume:function(e){var t=this;return t._volume&&!e||(t._volume=(t.r2-t.r1+1)*(t.g2-t.g1+1)*(t.b2-t.b1+1)),t._volume},count:function(e){var t=this,a=t.histo;if(!t._count_set||e){var u,o,s,p=0;for(u=t.r1;u<=t.r2;u++)for(o=t.g1;o<=t.g2;o++)for(s=t.b1;s<=t.b2;s++)p+=a[n(u,o,s)]||0;t._count=p,t._count_set=!0}return t._count},copy:function(){var e=this;return new r(e.r1,e.r2,e.g1,e.g2,e.b1,e.b2,e.histo)},avg:function(e){var t=this,a=t.histo;if(!t._avg||e){var u,o,s,p,f=0,h=0,d=0,v=0;if(t.r1===t.r2&&t.g1===t.g2&&t.b1===t.b2)t._avg=[t.r1<<3,t.g1<<3,t.b1<<3];else{for(o=t.r1;o<=t.r2;o++)for(s=t.g1;s<=t.g2;s++)for(p=t.b1;p<=t.b2;p++)f+=u=a[n(o,s,p)]||0,h+=u*(o+.5)*8,d+=u*(s+.5)*8,v+=u*(p+.5)*8;t._avg=f?[~~(h/f),~~(d/f),~~(v/f)]:[~~(8*(t.r1+t.r2+1)/2),~~(8*(t.g1+t.g2+1)/2),~~(8*(t.b1+t.b2+1)/2)]}}return t._avg},contains:function(e){var t=this,a=e[0]>>3;return gval=e[1]>>3,bval=e[2]>>3,a>=t.r1&&a<=t.r2&&gval>=t.g1&&gval<=t.g2&&bval>=t.b1&&bval<=t.b2}},l.prototype={push:function(e){this.vboxes.push({vbox:e,color:e.avg()})},palette:function(){return this.vboxes.map(function(e){return e.color})},size:function(){return this.vboxes.size()},map:function(e){for(var t=this.vboxes,a=0;a<t.size();a++)if(t.peek(a).vbox.contains(e))return t.peek(a).color;return this.nearest(e)},nearest:function(e){for(var t,a,u,o=this.vboxes,s=0;s<o.size();s++)((a=Math.sqrt(Math.pow(e[0]-o.peek(s).color[0],2)+Math.pow(e[1]-o.peek(s).color[1],2)+Math.pow(e[2]-o.peek(s).color[2],2)))<t||t===void 0)&&(t=a,u=o.peek(s).color);return u},forcebw:function(){var e=this.vboxes;e.sort(function(o,s){return A(S(o.color),S(s.color))});var t=e[0].color;t[0]<5&&t[1]<5&&t[2]<5&&(e[0].color=[0,0,0]);var a=e.length-1,u=e[a].color;u[0]>251&&u[1]>251&&u[2]>251&&(e[a].color=[255,255,255])}},{quantize:function(e,t){if(!Number.isInteger(t)||t<1||t>256)throw new Error("Invalid maximum color count. It must be an integer between 1 and 256.");if(!e.length||t<2||t>256||!e.length||t<2||t>256)return!1;for(var a=[],u=new Set,o=0;o<e.length;o++){var s=e[o],p=s.join(",");u.has(p)||(u.add(p),a.push(s))}if(a.length<=t)return new K(a);var f=function(b){var y,m=new Array(32768);return b.forEach(function(k){y=n(k[0]>>3,k[1]>>3,k[2]>>3),m[y]=(m[y]||0)+1}),m}(e);f.forEach(function(){});var h=function(b,y){var m,k,w,C=1e6,M=0,F=1e6,B=0,L=1e6,_=0;return b.forEach(function(z){(m=z[0]>>3)<C?C=m:m>M&&(M=m),(k=z[1]>>3)<F?F=k:k>B&&(B=k),(w=z[2]>>3)<L?L=w:w>_&&(_=w)}),new r(C,M,F,B,L,_,y)}(e,f),d=new c(function(b,y){return A(b.count(),y.count())});function v(b,y){for(var m,k=b.size(),w=0;w<1e3;){if(k>=y||w++>1e3)return;if((m=b.pop()).count()){var C=g(f,m),M=C[0],F=C[1];if(!M)return;b.push(M),F&&(b.push(F),k++)}else b.push(m),w++}}d.push(h),v(d,.75*t);for(var x=new c(function(b,y){return A(b.count()*b.volume(),y.count()*y.volume())});d.size();)x.push(d.pop());v(x,t);for(var E=new l;x.size();)E.push(x.pop());return E}}}().quantize,T=function(n){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=n.naturalWidth,this.height=this.canvas.height=n.naturalHeight,this.context.drawImage(n,0,0,this.width,this.height)};T.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var D=function(){};D.prototype.getColor=function(n,c){return c===void 0&&(c=10),this.getPalette(n,5,c)[0]},D.prototype.getPalette=function(n,c,r){var l=function(a){var u=a.colorCount,o=a.quality;if(u!==void 0&&Number.isInteger(u)){if(u===1)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");u=Math.max(u,2),u=Math.min(u,20)}else u=10;return(o===void 0||!Number.isInteger(o)||o<1)&&(o=10),{colorCount:u,quality:o}}({colorCount:c,quality:r}),g=new T(n),e=function(a,u,o){for(var s,p,f,h,d,v=a,x=[],E=0;E<u;E+=o)p=v[0+(s=4*E)],f=v[s+1],h=v[s+2],((d=v[s+3])===void 0||d>=125)&&(p>250&&f>250&&h>250||x.push([p,f,h]));return x}(g.getImageData().data,g.width*g.height,l.quality),t=X(e,l.colorCount);return t?t.palette():null},D.prototype.getColorFromUrl=function(n,c,r){var l=this,g=document.createElement("img");g.addEventListener("load",function(){var e=l.getPalette(g,5,r);c(e[0],n)}),g.src=n},D.prototype.getImageData=function(n,c){var r=new XMLHttpRequest;r.open("GET",n,!0),r.responseType="arraybuffer",r.onload=function(){if(this.status==200){var l=new Uint8Array(this.response);i=l.length;for(var g=new Array(i),e=0;e<l.length;e++)g[e]=String.fromCharCode(l[e]);var t=g.join(""),a=window.btoa(t);c("data:image/png;base64,"+a)}},r.send()},D.prototype.getColorAsync=function(n,c,r){var l=this;this.getImageData(n,function(g){var e=document.createElement("img");e.addEventListener("load",function(){var t=l.getPalette(e,5,r);c(t[0],this)}),e.src=g})};const $=new D;function q(n){let c=n[0]/255,r=n[1]/255,l=n[2]/255,g,e,t;return c=c>.04045?Math.pow((c+.055)/1.055,2.4):c/12.92,r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92,l=l>.04045?Math.pow((l+.055)/1.055,2.4):l/12.92,g=(c*.4124+r*.3576+l*.1805)/.95047,e=(c*.2126+r*.7152+l*.0722)/1,t=(c*.0193+r*.1192+l*.9505)/1.08883,g=g>.008856?Math.pow(g,1/3):7.787*g+16/116,e=e>.008856?Math.pow(e,1/3):7.787*e+16/116,t=t>.008856?Math.pow(t,1/3):7.787*t+16/116,[116*e-16,500*(g-e),200*(e-t)]}function I(n,c){const r=q(n),l=q(c),g=r[0]-l[0],e=r[1]-l[1],t=r[2]-l[2],a=Math.sqrt(r[1]*r[1]+r[2]*r[2]),u=Math.sqrt(l[1]*l[1]+l[2]*l[2]),o=a-u;let s=e*e+t*t-o*o;s=s<0?0:Math.sqrt(s);const p=1+.045*a,f=1+.015*a,h=g/1,d=o/p,v=s/f,x=h*h+d*d+v*v;return x<0?0:Math.sqrt(x)}function G(n){return $.getPalette(n,5)}function J(n,{r:c,g:r,b:l}){const g=G(n);if(g.map(t=>I([c,r,l],t)).some(t=>t<20)){const t=g.map(o=>I([255,255,255],o)),a=g.map(o=>I([0,0,0],o)),u=N(t);return t[0]<8||a[0]<8?{type:"invert"}:u<60?{type:"stroke",color:"black"}:{type:"stroke",color:"white"}}else return{type:"origin"}}function Q(n,{r:c,g:r,b:l}){if(n.map(e=>I([c,r,l],e)).some(e=>e<20)){const e=n.map(u=>I([255,255,255],u)),t=n.map(u=>I([0,0,0],u)),a=N(e);return e[0]<8||t[0]<8?{type:"invert"}:a<60?{type:"stroke",color:"black"}:{type:"stroke",color:"white"}}else return{type:"origin"}}function H(){if(document.getElementById("svg-stroke-filter"))return;const r=new DOMParser().parseFromString(`<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" id="svg-stroke-filter">
  <defs>
    <filter id="strokeFilter1">
      <feMorphology
        operator="dilate"
        radius="1"
        in="SourceAlpha"
        result="expandedEdges"
      />
      <feGaussianBlur
        in="expandedEdges"
        stdDeviation="1"
        result="blurredEdges"
      />
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 255
                0 1 0 0 255
                0 0 1 0 255
                0 0 0 100 -10"
        in="blurredEdges"
        result="coloredEdges"
      />
      <feMerge>
        <feMergeNode in="coloredEdges" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="strokeFilter2">
      <!-- \u4F7F\u7528feMorphology\u6269\u5C55\u8FB9\u7F18 -->
      <feMorphology
        operator="dilate"
        radius="1"
        in="SourceAlpha"
        result="expandedEdges"
      />
      <!-- \u4F7F\u7528feGaussianBlur\u6A21\u7CCA\u5904\u7406\u8FB9\u7F18 -->
      <feGaussianBlur
        in="expandedEdges"
        stdDeviation="1"
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
</svg>`,"image/svg+xml");document.body.appendChild(r.documentElement)}const V=[{key:"black",url:"/__asset/static/public/88737dedf4fe46f5afe3c8bd145366a1.png",rgb:{r:0,g:0,b:0}},{key:"white",url:"/__asset/static/public/255f60e273e3423eaba694ab09deeec7.png",rgb:{r:255,g:255,b:255}},{key:"yellow",url:"/__asset/static/public/7155c476632b4f368691f610e1ee73be.png",rgb:{r:237,g:183,b:70}},{key:"pink",url:"/__asset/static/public/9133660157404794a65e290ff1960af5.png",rgb:{r:238,g:203,b:212}},{key:"violet",url:"/__asset/static/public/f54024c812834bfaa2ad773bd7b8e4cf.png",rgb:{r:139,g:124,b:192}},{key:"red",url:"/__asset/static/public/fae84e43e5a54fb9a058f0d4824bb253.png",rgb:{r:178,g:43,b:32}},{key:"bue",url:"/__asset/static/public/a3acecd61aa344bf86b11ef3d8db7c93.png",rgb:{r:81,g:120,b:205}},{key:"green",url:"/__asset/static/public/b9ce025cb2af4414bc5d49db9d16e3a0.png",rgb:{r:41,g:129,b:66}}];async function at(n,c){const{img:r,width:l,height:g}=await P(n),e=document.createElement("canvas");e.width=l,e.height=g;const t=e.getContext("2d"),{type:a,color:u}=J(r,c);return a==="invert"?t.filter="invert(1)":a==="stroke"&&(H(),t.filter=u==="white"?"url(#strokeFilter1)":"url(#strokeFilter2)"),t.drawImage(r,0,0,l,g),e.toDataURL()}async function Y(n,c){const{img:r,width:l,height:g}=await P(n),e=tt(l,g),t=e.getContext("2d"),a=G(r),u={};H();for(let o=0;o<c.length;o++){t.save();const{rgb:s,key:p}=V.find(d=>d.key===c[o]);t.clearRect(0,0,l,g);const{type:f,color:h}=Q(a,s);f==="invert"?t.filter="invert(1)":f==="stroke"&&(t.filter=h==="white"?"url(#strokeFilter1)":"url(#strokeFilter2)"),t.drawImage(r,0,0,l,g),u[p]=await et(e),t.restore()}return u}function tt(n,c){const r=document.createElement("canvas");return r.width=n,r.height=c,r}async function et(n){return n.convertToBlob?await n.convertToBlob():new Promise(c=>{n.toBlob(r=>{c(r)})})}async function ut(n){const c=new U;for(let r=0;r<n.length;r++){const l=n[r].url,g=n[r].colors,e=l.split("/"),t=e[e.length-1].split(".")?.[0],a=c.folder(t),u=await Y(l,g);for(const o in u)await a.file(`\u591A\u914D\u8272-${o}.png`,u[o],{binary:!0})}return new Promise(r=>{c.generateAsync({type:"blob"}).then(function(l){O.exports.saveAs(l,"\u591A\u914D\u8272-\u6279\u91CF\u4E0B\u8F7D.zip"),r(!0)})})}export{J as a,ut as b,V as c,H as d,at as g};
//# sourceMappingURL=index.1eb85a11.js.map
