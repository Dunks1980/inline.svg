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
    let xhr = new XMLHttpRequest();
    xhr.open('GET', href);
    xhr.onload = () => {
      el.insertAdjacentHTML('afterend', xhr.responseText.trim());
      if (hasCallback) {
        arrOfEls.push({
          url: href,
          element: el.nextSibling
        });
      }
      el.parentNode.removeChild(el);
      if (last_image && hasCallback) {
        callback(arrOfEls);
      }
    };
    xhr.send();
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