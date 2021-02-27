import 'whatwg-fetch';
import { polyfill } from 'es6-promise'; polyfill();

const supports_DOMParser = () => {
	if (!window.DOMParser) return false;
	var parser = new DOMParser();
	try {
		parser.parseFromString('x', 'text/html');
	} catch(err) {
		return false;
	}
	return true;
};

supports_DOMParser();

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

const inlinesvg = (query, callback) => {
  let arrOfEls,
    els = document.querySelectorAll(query),
    count = 0,
    red = 'color:red;',
    yellow = 'color:yellow;',
    green = 'color: lightgreen;',
    inherit = 'color:inherit;',
    code = 'font-size: 16px; font-family: "Courier New", monospace;',
    prefix = 'inline.svg: ',
    c = '%c';
  const endsWith = (str, suffix) => {
    return str.slice(-suffix.length) === suffix;
  };
  const getImage = (el, href, count, last_image) => {
    let hasCallback = callback && typeof callback === 'function';
    window.fetch(href)
      .then(function(response) {
        return response.text();
      }).then(function(body) {
        let firstChild_el = stringToHTML(body).firstChild;
        if (!firstChild_el) {
          return console.log(c + prefix + c + 'SVG Element not found in file: ' + href, red, inherit);
        }
        el.insertAdjacentElement('afterend', firstChild_el);
        el.parentNode.removeChild(el);
        if (hasCallback) {
          arrOfEls.push({
            url: href,
            element: firstChild_el
          });
        }
        if (last_image && hasCallback) {
          callback(arrOfEls);
        }
      });
  };
  if (els && els.length) {
    arrOfEls = [];
    [].forEach.call(els, (el) => {
      if (!el) {
        return console.log(c + prefix + c + 'Element not found', red, inherit);
      }
      if (el.tagName.toLowerCase() === 'a') {
        let href = el.href;
        if (!href) return console.log(c + prefix + c + 'No href found', red, inherit);
        if (endsWith(href, '.svg')) {
          count++;
          getImage(el, href, (count).toString(), Number(count) === Number(els.length));
        } else {
          return console.log(c + prefix + c + 'Can only convert svg files', red, inherit);
        }
      } else {
        console.log(c + '\n\n' + prefix + c + 'Element needs to be a Anchor Tag, Example:\n', red, inherit);
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
    return console.log(c + prefix + c + 'No elements found for the selector ' + c + query,
      red,
      inherit,
      yellow
    );
  }
};
if (typeof exports != "undefined") {
  exports.inlinesvg = inlinesvg;
} else {
  window.inlinesvg = inlinesvg;
}