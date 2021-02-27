import {
  polyfill
} from 'es6-promise';
import 'whatwg-fetch';
import "core-js/stable";
import "regenerator-runtime/runtime";
polyfill();

const
  dataAttr = 'data-inlinesvg',
  prefix = 'inline.svg: ',
  red = 'color:red;',
  green = 'color: lightgreen;',
  inherit = 'color:inherit;',
  code = 'font-size: 16px; font-family: "Courier New", monospace;',
  c = '%c';

const supports_DOMParser = () => {
  if (!window.DOMParser) return false;
  var parser = new DOMParser();
  try {
    parser.parseFromString('x', 'text/html');
  } catch (err) {
    return false;
  }
  return true;
};

const stringToHTML = (str) => {
  if (supports_DOMParser) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  } else {
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  }
};

const checkElement = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};

const endsWith = (str, suffix) => {
  return str.slice(-suffix.length) === suffix;
};

const errorLogger = (message) => {
  return console.log(c + prefix + c + message, red, inherit);
};

const inlinesvg = (query, callback, return_elements) => {

  let
    arrOfEls,
    arrOfAdded = [],
    countOfAdded = 0,
    els = document.querySelectorAll(query),
    count = 0;

  // Get images and return callback with data:
  const getImage = (source_el, href, last_image) => {
    let hasCallback = callback && typeof callback === 'function';
    window.fetch(href)
      .then(function (response) {
        return response.text();
      })
      .then(function (body) {
        if (!stringToHTML(body) && !stringToHTML(body).childNodes[0]) {
          return errorLogger('No Element not found in file: ' + href);
        }
        let firstChild_el = stringToHTML(body).childNodes[0];
        firstChild_el.setAttribute(dataAttr, `${query}-${++countOfAdded}`);
        source_el.insertAdjacentElement('afterend', firstChild_el);
        arrOfAdded.push(`${query}-${countOfAdded}`);
        return firstChild_el;
      })
      .then(function (firstChild_el) {
        source_el.parentNode.removeChild(source_el);
        if (hasCallback) {
          arrOfEls.push({
            url: href,
            dataAttr: `${query}-${countOfAdded}`,
            element: return_elements ? firstChild_el : false
          });
        }
      }).then(function () {
        if (last_image && hasCallback) {
          let countOfFound = 0;
          arrOfAdded.forEach((item) => {
            checkElement(`[${dataAttr}="${item}"]`).then(() => {
              countOfFound++;
              if (countOfFound === countOfAdded) callback(arrOfEls);
            });
          });
        }
      });
  };
  
  // Check for issues and get images:
  if (els && els.length) {
    arrOfEls = [];
    [].forEach.call(els, (el) => {
      if (!el) {
        errorLogger('Element not found');
      }
      if (el.tagName.toLowerCase() === 'a') {
        let href = el.href;
        if (!href) return errorLogger('No href found');
        if (endsWith(href, '.svg')) {
          getImage(el, href, Number(count) === Number(els.length - 1));
          count++;
        } else {
          return errorLogger('Can only convert svg files');
        }
      } else {
        errorLogger('Element needs to be a Anchor Tag, Example:\n');
        console.log(c + `\t${el.outerHTML}\n`, red + code);
        console.log('Change to:\n\n');
        console.log(c + `\t<a ${
          el.classList ?
            `class="${el.classList}" ` : ``
          }${
          el.id ?
            `id="${el.id}" ` : ``
          }href="/my-file.svg"></a>\n\n`,
          green + code
        );
      }
    });
  } else {
    return errorLogger('No elements found for the selector: ' + query);
  }
};
if (typeof exports != "undefined") {
  exports.inlinesvg = inlinesvg;
} else {
  window.inlinesvg = inlinesvg;
}