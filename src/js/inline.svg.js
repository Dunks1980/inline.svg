const inlinesvg = (query, callback) => {
  let arrOfEls;
  const endsWith = (str, suffix) => {
    return str.slice(-suffix.length) === suffix;
  };
  const getImage = (el, href, count, last_image) => {
    let hasCallback = callback && typeof callback === 'function';
    let xhr = new XMLHttpRequest();
    xhr.open("GET", href);
    xhr.onload = () => {
      el.insertAdjacentHTML('afterend', xhr.responseText.trim());
      if (hasCallback) {
        arrOfEls.push({url: href, element: el.nextSibling});
      }
      el.parentNode.removeChild(el);
      if (last_image && hasCallback) {
        callback(arrOfEls);
      }
    };
    xhr.send();
  };
  let els = document.querySelectorAll(query);
  let count = 0;
  if (els && els.length) {
    //console.log('els-' + els.length);
    arrOfEls = [];
    [].forEach.call(els, (el) => {
      if (!el) return console.log("%cinlineSvgFile: %cElement not found ", 'color:red', 'color:inherit');
      if (el.tagName !== 'A') {
        console.log('-------------------------------------------------------------------------------------------');
        console.log("%cinlineSvgFile: %cElement needs to be a Anchor Tag, Example:", 'color:red', 'color:inherit');
        console.log(`%c${el.outerHTML}`, "color:red; font-size: 16px; font-family: 'Courier New', monospace;");
        console.log("Change to:");
        console.log(`%c<a${el.classList.length ? ' class="'+el.classList+'"' : ''}${el.id ? ' id="'+el.id+'"' : ''}${el.src ? ' href="path_to_file.svg"' : ''}></a>`, "color: lightgreen; font-size: 16px; font-family: 'Courier New', monospace;");
        console.log('-------------------------------------------------------------------------------------------');
      } else {
        let href = el.href;
        if (!href) return console.log("%cinlineSvgFile: %cNo href found", 'color:red', 'color:inherit');
        if (endsWith(href, '.svg')) {
          count++;
          getImage(el, href, (count).toString(), Number(count) === Number(els.length));
        } else {
          return console.log("%cinlineSvgFile: %cCan only convert svg files", 'color:red', 'color:inherit');
        }
      }
    });
  } else {
    return console.log("%cinlineSvgFile: %cNo elements found for the selector %c" + query, 'color:red', 'color:inherit', 'color:yellow');
  }
};
if (typeof exports != "undefined") {
  exports.inlinesvg = inlinesvg;
} else {
  window.inlinesvg = inlinesvg;
}