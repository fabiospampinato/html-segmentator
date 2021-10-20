
/* IMPORT */

import parse from './parse';
import serialize from './serialize';
import trim from './trim';
import {Segment} from './types';

/* MAIN */

const segmentator = ( html: string, collapseWhitespace: boolean = false ): Segment[] => {

  const collapse = collapseWhitespace ? trim : node => node;

  return collapse ( parse ( html ) ).childNodes.map ( node => {

    const start = node.startIndex || 0;
    const end = ( node.endIndex || 0 ) + 1; // Off by one in htmlparser2 🤷‍♂️
    const shtml = collapseWhitespace ? serialize ( node ) : html.slice ( start, end );

    return {start, end, html: shtml};

  });

};

/* EXPORT */

export default segmentator;
