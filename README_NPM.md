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
<br />

### Usage

New in version 1.2.0 - better for caching and wrapping with an anchor:

```html
<use class="svg" href="svg/foo.svg"></use> 
<use class="svg" href="svg/bar.svg"></use> 
```
New in version 1.3.0 - You can use any type of file extension as long as the contents are valid HTML, this can be used to inline HTML elements including script tags and not just SVG's:

```html
<use class="somehtml" href="svg/foo.html"></use> 
<use class="somephp" href="svg/bar.php"></use> 
```

Or old way:

```html
<a class="svg" href="svg/foo.svg"></a>
<a class="svg" href="svg/bar.svg"></a>
```
Then call this function in your JS, it will attempt to convert all tags it finds with that selector:

```javascript
inlinesvg('.svg');
```
This replaces the &lt;use&gt;&lt;/use&gt; or &lt;a&gt;&lt;/a&gt; tags with the SVG file contents, inlined in the document. 

<br/>

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

New in version 1.3.1 Passing data to inlined content:

index.html
```html
<use id="html" href="html/example.html"></use>
```

html/example.html
```html
<div class="{{classname}}">
  <p>{{line1}}</p>
  <p>{{line2}}</p>
  <p>{{line3}}</p>
  <p>{{line4}}</p>
</div>
```

```javascript
inlinesvg('#html', {
  classname: `my-class`,
  line1: `npm i @dunks1980/inline.svg --save`,
  line2: `import {inlinesvg} from "@dunks1980/inline.svg";`,
  line3: `&lt;use id="svg" href="/foo.svg"&gt;&lt;/use&gt;`,
  line4: `inlinesvg('#svg');`
});
```

Results in the following rendered in index.html:
```html
<div class="my-class">
  <p>npm i @dunks1980/inline.svg --save</p>
  <p>import {inlinesvg} from "@dunks1980/inline.svg";</p>
  <p>&lt;use id="svg" href="/foo.svg"&gt;&lt;/use&gt;</p>
  <p>inlinesvg('#svg');</p>
</div>
```