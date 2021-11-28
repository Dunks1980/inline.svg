import {inlinesvg} from "./inline.svg.js";

var js = document.getElementById('js').innerHTML; document.body.innerHTML = js;
var d = new Date();
var n = d.getFullYear();
var copywrite = '©' + n + ' <a href="https://dunks1980.com">dunks1980.com</a>';
document.querySelector('footer').innerHTML = copywrite;

let count = 0;
let arrOfLoaded = [];
const checkAllLoaded = () => {
  if (arrOfLoaded.length === 1) {
    //console.log('All loaded');
    document.querySelector('.svg-wrapper').classList.add('loaded');
  }
};

inlinesvg('.inlinesvg', (elements) => {
  count++;
  console.log(elements);
  arrOfLoaded.push('.inlinesvg');
  checkAllLoaded();
}, true);
inlinesvg('#svg', (elements) => {
  count++;
  console.log(elements);
  arrOfLoaded.push('#svg');
  checkAllLoaded();
}, false);
inlinesvg('#html', (elements) => {
  count++;
  console.log(elements);
  arrOfLoaded.push('#html');
  checkAllLoaded();
}, {
  line1: `npm i @dunks1980/inline.svg --save`,
  line2: `import {inlinesvg} from "@dunks1980/inline.svg";`,
  line3: `&lt;use id="svg" href="/foo.svg"&gt;&lt;/use&gt;`,
  line4: `inlinesvg('#svg');`
}, true);
