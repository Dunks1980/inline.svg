const endsWith = (str, suffix) => {
  return str.slice(-suffix.length) === suffix
};

const inlinesvg = (query) => {
  const getImage = (el, href) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", href);
    xhr.onload = () => {
      el.insertAdjacentHTML('afterend', xhr.responseText);
      el.parentNode.removeChild(el);
    };
    xhr.send();
  };
  let els = document.querySelectorAll(query);
  if (els && els.length) {
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
          getImage(el, href);
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