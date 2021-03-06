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

const errorLogger = (message) => {
  return console.log(c + prefix + c + message, red, inherit);
};

const errorLogger_change_to = (tagType, el) => {
  let uri = el.getAttribute('href') || el.getAttribute('src');
  console.log(c + `\t<${tagType} ${
    el.classList ?
      `class="${el.classList}" ` : ``
    }${
    el.id ?
      `id="${el.id}" ` : ``
    }${uri ?
      `href="${uri}"`:'href="/my-file.svg"'}></${tagType}>`,
    green + code);
};

const inlinesvg = (query, callback, return_elements) => {
  let
    arrOfEls,
    arrOfAdded = [],
    countOfAdded = 0,
    els = document.querySelectorAll(query),
    count = 0;

  const callbackChecker = () => {
    let countOfFound = 0;
    arrOfAdded.forEach((item) => {
      checkElement(`[${dataAttr}="${item}"]`).then(() => {
        countOfFound++;
        if (countOfFound === countOfAdded) callback(arrOfEls);
      });
    });
  };

  // Get images and return callback with data:
  const getImage = (source_el, href, last_image) => {
    let hasCallback = callback && typeof callback === 'function';
    window.fetch(href)
      .then(function (response) {
        return response.text();
      })
      .then(function (body) {
        let firstChild_el = stringToHTML(body).childNodes[0];
        if (!firstChild_el) return errorLogger('No Element not found in file: ' + href);
        let error = false;
        try {
          firstChild_el.setAttribute(dataAttr, `test`);
        } catch (e) {
          error = e instanceof TypeError;
          if (error) {
            errorLogger('Cannot inline this file: ' + href);
            if (hasCallback && last_image) {
              callbackChecker();
            }
          }
        }
        if (!error) {
          ++countOfAdded;
          firstChild_el.setAttribute(dataAttr, `${query}-${countOfAdded}`);
          source_el.parentNode.replaceChild(firstChild_el, source_el);
          arrOfAdded.push(`${query}-${countOfAdded}`);
          if (hasCallback) {
            arrOfEls.push({
              url: href,
              dataAttr: `${query}-${countOfAdded}`,
              element: return_elements ? firstChild_el : false
            });
            if (last_image) {
              callbackChecker();
            }
          }
        }
      }).catch(error => console.log(error));
  };
  // Check for issues and get images:
  if (els && els.length) {
    arrOfEls = [];
    [].forEach.call(els, (el) => {
      if (!el) {
        errorLogger('Element not found');
      }
      let tag = el.tagName.toLowerCase();
      if (tag === 'use' || tag === 'a') {
        let href = el.getAttribute('href');
        if (!href) return errorLogger('No href found');
        getImage(el, href, Number(count) === Number(els.length - 1));
        count++;
      } else {
        errorLogger('Element needs to be a <use></use> or <a></a> Tag, Example:');
        console.log(c + `\t${el.outerHTML}`, red + code);
        console.log('Change to:');
        errorLogger_change_to('use', el);
        console.log('Or:');
        errorLogger_change_to('a', el);
      }
    });
  } else {
    return errorLogger('No elements found for the selector: ' + query);
  }
};
if (typeof exports != "undefined") exports.inlinesvg = inlinesvg; 
else window.inlinesvg = inlinesvg;