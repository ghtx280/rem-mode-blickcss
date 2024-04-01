## BlickCss plugin that makes rem instead of px

### Installation
At the moment, blickcss 2.1.11 does not directly support plugins. However, you can still use this plugin. 

For CDN

```html
<script src="https://unpkg.com/blickcss"></script>
<script src="https://unpkg.com/rem-mode-blickcss"></script>
<script>RemMode()(blick)</script>
```

For NPM

```shell
$ npm i rem-mode-blickcss
```

```js
import { RemMode } from 'rem-mode-blickcss'

/** @type {import('blickcss').config} */
export default (b) => {
    b.config({ /* your configurations here */ })

    RemMode({ grade: 16 })(b)

    return b
}
```

### Configuration

You can configure 2 parameters

- grade ( type number, default 16 )
- ignore ( type RegExp )

grade is the correspondence of the value to rem, for example, by default `m-16` is equal to `margin: 1rem`. You can set the value to `grade: 4` to make it like in TailwindCss `m-4` will be `margin: 1rem`

ignore is which css properties to ignore. For example, `ignore: /margin|padding/` to prevent the plugin from being applied to margin and padding. But you need to remember one thing, all properties that contain the word `margin` will be ignored, that is `margin-left`, `margin-right` and so on. To avoid this, write something like this `ignore: /^\s*margin\s*:|^\s*padding\s*:/`

