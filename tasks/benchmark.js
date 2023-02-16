
/* IMPORT */

import benchmark from 'benchloop';
import segmentate from '../dist/index.js';

/* HELPERS */

const HTML = 'foo<p foo="123" bar="123" baz="123">bar<img /><p>baz</p></p>'.repeat ( 1000 );

/* MAIN */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 300
});

benchmark ({
  name: 'segmentate',
  fn: () => {
    segmentate ( HTML );
  }
});
