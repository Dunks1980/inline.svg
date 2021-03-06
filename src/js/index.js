import {inlinesvg} from "./inline.svg.js";

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
