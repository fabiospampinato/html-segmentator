
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
    segmentate ( 'foo<p>bar<img /><p>baz</p></p>'.repeat ( 1000 ) );
  }
});
