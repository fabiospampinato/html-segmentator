# HTML Segmentator

A small library for splitting an HTML string into its top-level sections, optionally collapsing whitespace too. Based on [htmlparser2](https://github.com/fb55/htmlparser2).

## Install

```sh
npm install --save html-segmentator
```

## Usage

```ts
import segmentator from 'html-segmentator';

const html = '<div><b>foo</b></div><i>bar</i>';
const segments = segmentator ( html );

console.log ( segments );
// [
//   { start: 0, end: 21, html: '<div><b>foo</b></div>' },
//   { start: 21, end: 31, html: '<i>bar</i>' }
// ]
```

## License

- Library MIT © Fabio Spampinato.
- Parser MIT © [htmlparser2](https://github.com/fb55/htmlparser2).
- Serializer MIT © [dom-serializer](https://github.com/cheeriojs/dom-serializer).
