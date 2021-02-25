import {inlinesvg} from "./inline.svg.js";
inlinesvg('.inlinesvg');
inlinesvg('#svg');
let d = new Date();
let n = d.getFullYear();
let copywrite = `©${n} <a href="https://dunks1980.com">dunks1980.com</a>`;
document.querySelector('footer').innerHTML = copywrite;