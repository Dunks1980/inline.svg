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
```html
<a class="svg" href="svg/inline1.svg"></a>
<a class="svg" href="svg/inline2.svg"></a>
```

```javascript
inlinesvg('.svg');
```
This replaces the anchor tag with the SVG file contents, inlined in the document. 

<br/>

If you need an anchor to wrap your svg (if its a link) wrap the svg in another element like a div or a span, then wrap that with your anchor like so:

```html
<a href="/my-link" rel="noopener" aria-label="my-image">
  <div> 
    <a class="svg" href="svg/inline1.svg"></a>
  </div>
</a>
```
Or, alternatively, and probably a better way (as not nesting anchors), open the svg file in a text editor/IDE and wrap the SVG in your anchor tag:
```html
<a href="/my-link" rel="noopener" aria-label="my-image">
  <svg>...</svg>
</a>
```

A Callback is available for after adding the SVG's:

```javascript
inlinesvg('.inlinesvg', (elements) => {
  console.log(elements);
});

```

With the url of the the SVG loaded (for identifying them) and the element loaded for JS usage if needed:
```javascript
// console.log(elements);
▼ (4) [{…}, {…}, {…}, {…}]
▶ 0: {url: "http://localhost:1234/svg/logo.svg", element: svg#logo}
▶ 1: {url: "http://localhost:1234/svg/npm.svg", element: svg#npm}
▶ 2: {url: "http://localhost:1234/svg/github.svg", element: svg#github}
▶ 3: {url: "http://localhost:1234/svg/email.svg", element: svg}#email
▶ length: 4
▶ __proto__: Array(0)
```
