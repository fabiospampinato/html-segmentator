
/* IMPORT */

import {describe} from 'fava';
import segmentator from '../dist/index.js';

/* MAIN */

//TODO: Add tests for the incremental segmentator too

describe ( 'HTML Segmentator', it => {

  it ( 'can segmentate html', t => {

    const html = '<div><b>foo</b></div><i>bar</i><div>baz</div>\n';
    const segment1 = { start: 0, end: 21 };
    const segment2 = { start: 21, end: 31 };
    const segment3 = { start: 31, end: 45 };
    const segment4 = { start: 45, end: 46 };
    const segments = [segment1, segment2, segment3, segment4];

    t.deepEqual ( segmentator ( html ), segments );

  });

});
