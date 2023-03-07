# HTML Segmentator

A small library for splitting an HTML string into its top-level sections. Based on [html5parser](https://github.com/acrazing/html5parser).

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
- Tokenizer MIT © [html5parser](https://github.com/acrazing/html5parser).
