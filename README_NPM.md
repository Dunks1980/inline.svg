# inline.svg

A simple way of rendering a SVG file into a HTML document so styling and js can be applied to it.
<br />
<br />

```
npm i @dunks1980/inline.svg --save
```

```
<a class="svg" href="svg/inline1.svg"></a>
<a class="svg" href="svg/inline2.svg"></a>
```

```
import {inlinesvg} from "./inline.svg.js";
```

```
inlinesvg('.svg');
```
<br />
Click the Anchor tag, if it opens the svg it should have no issue rendering to the DOM. Works in IE11.
