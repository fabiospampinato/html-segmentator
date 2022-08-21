
/* IMPORT */

import benchmark from 'benchloop';
import segmentate from '../dist/index.js';

/* MAIN */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 300,
  log: 'compact'
});

benchmark ({
  name: 'segmentate',
  fn: () => {
    segmentate ( 'foo<p foo="123" bar="123" baz="123">bar<img /><p>baz</p></p>'.repeat ( 1000 ) );
  }
});
