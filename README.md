# inline.svg

A simple way to render a SVG file into a HTML document so styling and js can be applied to it.
<br />
## <a href="https://inlinesvg.dunks1980.com">Demo</a>
<br />

### Install
```
npm i @dunks1980/inline.svg --save
```
```
import {inlinesvg} from "@dunks1980/inline.svg";
```
### Or

```
<script src="https://unpkg.com/@dunks1980/inline.svg/index.min.js" defer></script>
```
<br />

### Usage
```
<a class="svg" href="svg/inline1.svg"></a>
<a class="svg" href="svg/inline2.svg"></a>
```

```
inlinesvg('.svg');
```
This replaces the anchor tag with the SVG file contents, inlined in the document. If you need an anchor to wrap your svg (if its a link) wrap the svg in another element like a div or a span, then wrap that with your anchor like so:

```
<a href="/my-link">
  <div> 
    <a class="svg" href="svg/inline1.svg"></a>
  </div>
</a>
```
Or, alternatively, and which is probably better way (as not nesting anchors) is to open the svg file in a text editor/IDE and wrap the SVG in your anchor tag. 

