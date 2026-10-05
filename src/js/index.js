import {inlinesvg} from "./inline.svg.js";
import logoSvg from "url:../svg/logo.svg";
import npmSvg from "url:../svg/npm.svg";
import githubSvg from "url:../svg/github.svg";
import emailSvg from "url:../svg/email.svg";
import inlineSvg from "url:../svg/inline.svg";
import htmlExample from "url:../html/html.html";

var js = document.getElementById('js').innerHTML; document.body.innerHTML = js;
document.querySelector('.logo use').setAttribute('href', logoSvg);
document.querySelector('.npm use').setAttribute('href', npmSvg);
document.querySelector('.github use').setAttribute('href', githubSvg);
document.querySelector('.email use').setAttribute('href', emailSvg);
document.querySelector('#svg').setAttribute('href', inlineSvg);
document.querySelector('#html').setAttribute('href', htmlExample);
var d = new Date();
var n = d.getFullYear();
var copywrite = '©' + n + ' <a href="https://ian.dunkerley.dev">ian.dunkerley.dev</a>';
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

