
/* IMPORT */

const {describe} = require ( 'fava' );
const {default: segmentator} = require ( '../dist' );

/* MAIN */

describe ( 'HTML Segmentator', it => {

  it ( 'works', t => {

    const html = '<div><b>foo</b></div><i>bar</i><div>baz</div>';
    const segment1 = { start: 0, end: 21, html: '<div><b>foo</b></div>' };
    const segment2 = { start: 21, end: 31, html: '<i>bar</i>' };
    const segment3 = { start: 31, end: 45, html: '<div>baz</div>' };
    const segments = [segment1, segment2, segment3];

    t.deepEqual ( segmentator ( html ), segments );

  });

});
