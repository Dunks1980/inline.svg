# inline.svg

A simple way of rendering a SVG file into a HTML document so styling and js can be applied to it.
<br />
## <a href="https://inlinesvg.dunks1980.com">Demo</a>
<br />

```
npm i @dunks1980/inline.svg --save
```

```
<a class="svg" href="svg/inline1.svg"></a>
<a class="svg" href="svg/inline2.svg"></a>
```

```
import {inlinesvg} from "@dunks1980/inline.svg";
```

```
inlinesvg('.svg');
```
<br />
Click the Anchor tag, if it opens the svg it should have no issue rendering to the DOM.
