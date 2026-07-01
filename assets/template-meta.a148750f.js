import{a as u}from"./pod-category.fca04ef1.js";function c(t){const o=[],a=u(),{category1:e,category2:s}=a.resolveCategoryFields(t),r=a.getCategoryLabelByCodes(e,s);return r&&o.push(r),t.charLimit!=null&&Number(t.charLimit)>0&&o.push(`\u5B57\u7B26\u6570${t.charLimit}\u4EE5\u5185`),t.platform&&o.push(t.platform),o}export{c as g};
//# sourceMappingURL=template-meta.a148750f.js.map
