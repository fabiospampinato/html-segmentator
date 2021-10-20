
/* IMPORT */

const {describe} = require ( 'fava' );
const {default: segmentator} = require ( '../dist' );

/* MAIN */

describe ( 'HTML Segmentator', it => {

  it ( 'can segmentate html, without collapsing space', t => {

    const html = '<div><b>foo</b></div><i>bar</i><div>baz</div>\n';
    const segment1 = { start: 0, end: 21, html: '<div><b>foo</b></div>' };
    const segment2 = { start: 21, end: 31, html: '<i>bar</i>' };
    const segment3 = { start: 31, end: 45, html: '<div>baz</div>' };
    const segment4 = { start: 45, end: 46, html: '\n' };
    const segments = [segment1, segment2, segment3, segment4];

    t.deepEqual ( segmentator ( html ), segments );

  });

  it ( 'can segmentate html, collapsing space', t => {

    const html = '\n\n\r\n<div>\n<b>asd</b>\r</div>\n\r';
    const segment = { start: 4, end: 27, html: '<div><b>asd</b></div>' };
    const segments = [segment];

    t.deepEqual ( segmentator ( html, true ), segments );

  });

});
