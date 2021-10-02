
/* IMPORT */

import parse from './parse';
import {Segment} from './types';

/* MAIN */

const segmentator = ( html: string ): Segment[] => {

  return parse ( html ).childNodes.map ( node => {

    const start = node.startIndex || 0;
    const end = ( node.endIndex || 0 ) + 1; // Off by one in htmlparser2 🤷‍♂️
    const shtml = html.slice ( start, end );

    return {start, end, html: shtml};

  });

};

/* EXPORT */

export default segmentator;
