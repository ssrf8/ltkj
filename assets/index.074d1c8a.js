function f(t,d,o="files"){for(let e=0;e<t.length;e++){const i=t[e];for(let n=0;n<i[o].length;n++)if(i[o][n].id===d.id)return{index:e*n,rowIndex:e,colIndex:n}}}export{f as g};
