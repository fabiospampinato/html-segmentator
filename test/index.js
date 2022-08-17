
/* IMPORT */

import {describe} from 'fava';
import segmentator from '../dist/index.js';

/* MAIN */

//TODO: Add tests for the incremental segmentator too

describe ( 'HTML Segmentator', it => {

  it ( 'works with basic html', t => {

    const html = '<div><b>foo</b></div><i>bar</i><div>baz</div>\n';

    const segments = [
      { start: 0, end: 21 },
      { start: 21, end: 31 },
      { start: 31, end: 45 },
      { start: 45, end: 46 }
    ];

    t.deepEqual ( segmentator ( html ), segments );

  });

  it ( 'works with self-closing tags', t => {

    const html = '<p>foo</p>\n\n<img />\n\n<p>bar</p>';

    const segments = [
      { start: 0, end: 10 },
      { start: 10, end: 12 },
      { start: 12, end: 19 },
      { start: 19, end: 21 },
      { start: 21, end: 31 }
    ];

    t.deepEqual ( segmentator ( html ), segments );

  });

  it ( 'works with plain strings', t => {

    const html = 'foo\n\nbar';

    const segments = [
      { start: 0, end: 8 }
    ];

    t.deepEqual ( segmentator ( html ), segments );

  });

  it ( 'works with unclosed tags', t => {

    const html = '<p>foo';

    const segments = [
      { start: 0, end: 6 }
    ];

    t.deepEqual ( segmentator ( html ), segments );

  });

  it ( 'works with comments', t => {

    const html = 'foo<!-- comment -->bar';

    const segments = [
      { start: 0, end: 3 },
      { start: 3, end: 19 },
      { start: 19, end: 22 }
    ];

    t.deepEqual ( segmentator ( html ), segments );

  });

  it ( 'works with void elements', t => {

    const html = 'foo<br><img><img />bar';

    const segments = [
      { start: 0, end: 3 },
      { start: 3, end: 7 },
      { start: 7, end: 12 },
      { start: 12, end: 19 },
      { start: 19, end: 22 }
    ];

    t.deepEqual ( segmentator ( html ), segments );

  });

  it ( 'works with spaces', t => {

    const html = '   <p>foo</p>   ';

    const segments = [
      { start: 0, end: 3 },
      { start: 3, end: 13 },
      { start: 13, end: 16 }
    ];

    t.deepEqual ( segmentator ( html ), segments );

  });

});
