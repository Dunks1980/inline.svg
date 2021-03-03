import {inlinesvg} from "./inline.svg.js";

let arrOfLoaded = [];
const checkAllLoaded = () => {
  if (arrOfLoaded.length === 2) {
    console.log('All loaded');
    document.querySelector('.svg-wrapper').classList.add('loaded');
  }
}

inlinesvg('.inlinesvg', (elements) => {
  console.log(elements);
  arrOfLoaded.push('.inlinesvg');
  checkAllLoaded();
}, true);
inlinesvg('#svg', (elements) => {
  console.log(elements);
  arrOfLoaded.push('#svg');
  checkAllLoaded();
}, false);
let d = new Date();
let n = d.getFullYear();
let copywrite = `©${n} <a href="https://dunks1980.com">dunks1980.com</a>`;
document.querySelector('footer').innerHTML = copywrite;

