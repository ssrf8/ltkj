import{r as u}from"./index.24626119.js";function n(){const a=u({});function o(r,s){r==="clear"?a.value={}:r==="add"?s?.forEach(e=>{e.results?.forEach(c=>{a.value[c.id]={source:c,parent:e}})}):r==="set"&&s.results?.forEach(e=>{a.value[e.id]={source:e,parent:s}})}return{onDataChange:o,cacheResultIdMap:a}}export{n as u};
//# sourceMappingURL=useCacheResultIdMap.197617b9.js.map
