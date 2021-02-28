# inline.svg

A simple way to render a SVG file into a HTML document so styling and js can be applied to it.
<br />
## <a href="https://inlinesvg.dunks1980.com">Demo</a>
<br />

### Install
```
npm i @dunks1980/inline.svg --save
```
```javascript
import {inlinesvg} from "@dunks1980/inline.svg";
```
### Or

```html
<script src="https://unpkg.com/@dunks1980/inline.svg/index.min.js" defer></script>
```
<br />

### Usage

New in version 1.2.0 (better for caching and wrapping with an anchor):

```html
<use class="svg" href="svg/inline1.svg"/>
<use class="svg" href="svg/inline2.svg"/>
```
! Note on using, &lt;use/&gt; tag. It has no closing tag and in my tests, if it is not immediately followed by a closing tag it can cause the rest of the page to render incorrectly, you could use &lt;use attrs&gt;&lt;/use&gt; but I find &lt;div&gt;&lt;use attrs/>&lt;/div&gt; cleaner as the &lt;use/&gt; tag doesn't usually have a closing tag. 

Or old way:

```html
<a class="svg" href="svg/inline1.svg"></a>
<a class="svg" href="svg/inline2.svg"></a>
```
Then call this function in your JS, it will attempt to convert all tags it finds with that selector:

```javascript
inlinesvg('.svg');
```
This replaces the &lt;a&gt;&lt;/a&gt; <a></a> or &lt;use/&gt; tags with the SVG file contents, inlined in the document. 

<br/>

If you use an anchor tag to inline the SVG wrap the anchor in another element like a div or a span, like so if you want it to be a link:

```html
<a href="/my-link" rel="noopener" aria-label="my-image">
  <div> 
    <a class="svg" href="svg/inline1.svg"></a>
  </div>
</a>
```

Or, alternatively, and probably a better way (as not nesting anchors, if using them), is to open the svg file in a text editor/IDE and wrap the SVG in your anchor tag:
```html
<a href="/my-link" rel="noopener" aria-label="my-image">
  <svg>...</svg>
</a>
```

If you use the &lt;use/&gt; tag this in not needed:

```html
<a href="/my-link" rel="noopener" aria-label="my-image">
  <use class="svg" href="svg/inline1.svg"/>
</a>
```

A Callback is available for after adding the SVG's:

```javascript
inlinesvg('.inlinesvg', (elements) => {
  console.log(elements);
});

```

With the url of the the SVG loaded and data attribute for identifying them:
```javascript
// console.log(elements);
▼ (4) [{…}, {…}, {…}, {…}]
▶ 0: {url: "http://localhost:1234/svg/logo.svg", data-inlinesvg: ".inlinesvg-1", element: false}
▶ 1: {url: "http://localhost:1234/svg/npm.svg", data-inlinesvg: ".inlinesvg-2", element: false}
▶ 2: {url: "http://localhost:1234/svg/github.svg", data-inlinesvg: ".inlinesvg-3", element: false}
▶ 3: {url: "http://localhost:1234/svg/email.svg", data-inlinesvg: ".inlinesvg-4", element: false}
▶ length: 4
▶ __proto__: Array(0)
```

Passing true after the callback returns the elements for JS usage if needed:

```javascript
inlinesvg('.inlinesvg', (elements) => {
  console.log(elements);
}, true);
```


```javascript
// console.log(elements);
▶ 0: {url: "http://localhost:1234/svg/logo.svg", data-inlinesvg: ".inlinesvg-1", element: a}
▶ 1: {url: "http://localhost:1234/svg/npm.svg", data-inlinesvg: ".inlinesvg-2", element: a}
▶ 2: {url: "http://localhost:1234/svg/github.svg", data-inlinesvg: ".inlinesvg-3", element: a}
▼  3:
  data-inlinesvg: ".inlinesvg-4"
  ▼ element: a
      accessKey: ""
      ariaAtomic: null
      ariaAutoComplete: null
      ariaBusy: null
      ariaChecked: null
      ariaColCount: null
      ariaColIndex: null
      ariaColSpan: null
```