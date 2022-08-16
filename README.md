# HTML Segmentator

A small library for splitting an HTML string into its top-level sections. Based on [htmlparser2](https://github.com/fb55/htmlparser2).

## Install

```sh
npm install --save html-segmentator
```

## Usage

```ts
import segmentator from 'html-segmentator';

// Splitting an HTML string into its top-level sections

const html = '<div><b>foo</b></div><i>bar</i>';
const segments = segmentator ( html );

console.log ( segments );
// [
//   { start: 0, end: 21 },
//   { start: 21, end: 31 }
// ]
```

## License

- Library MIT © Fabio Spampinato.
- Parser MIT © [htmlparser2](https://github.com/fb55/htmlparser2).
