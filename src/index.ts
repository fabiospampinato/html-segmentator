
/* IMPORT */

import parse from './parse';
import type {Segment} from './types';

/* MAIN */

const segmentator = ( html: string ): Segment[] => {

  return parse ( html ).childNodes.map ( node => {

    const start = node.startIndex || 0;
    const end = ( node.endIndex || 0 ) + 1; // Off by one in htmlparser2 🤷‍♂️

    return {start, end};

  });

};

/* UTILITIES */

//FIXME: This is potentially buggy with malformed HTML so that the remaining HTML is not self closing and it overflows into the next known segment, to fix this we should segmentate a bit more than the reamaining HTML, and if trailing extra segments don't match up with what we had already then we should probably throw the segmentation away and start from scratch

segmentator.incremental = ( html: string, htmlPrev: string, segmentsPrev: Segment[] ): Segment[] => {

  /* VARIABLES */

  let offsetStart = 0;
  let segmentStartIndex = -1;
  let segmentsStart: Segment[] = [];

  let offsetEnd = 0;
  let segmentsEnd: Segment[] = [];

  /* TRIMMING START */

  for ( let i = 0, l = segmentsPrev.length; i < l; i++ ) {

    const segment = segmentsPrev[i];
    const segmentStart = segment.start;
    const segmentEnd = segment.end;

    const slice = html.slice ( segmentStart, segmentEnd );
    const slicePrev = htmlPrev.slice ( segmentStart, segmentEnd );

    if ( slice !== slicePrev ) break;

    offsetStart = segmentEnd;
    segmentStartIndex = i;
    segmentsStart.push ({ ...segment });

  }

  /* TRIMMING END */

  for ( let i = segmentsPrev.length - 1; i > ( segmentStartIndex + 1 ); i-- ) {

    const segment = segmentsPrev[i];
    const segmentLength = segment.end - segment.start;
    const segmentStart = - ( offsetEnd + segmentLength );
    const segmentEnd = offsetEnd ? - offsetEnd : Infinity;

    const slice = html.slice ( segmentStart, segmentEnd );
    const slicePrev = htmlPrev.slice ( segmentStart, segmentEnd );

    if ( slice !== slicePrev ) break;

    offsetEnd += segmentLength;
    segmentsEnd.push ({ ...segment });

  }

  /* REMAINING */

  const htmlRemainingStart = offsetStart;
  const htmlRemainingEnd = offsetEnd ? - offsetEnd : Infinity;
  const htmlRemaining = html.slice ( htmlRemainingStart, htmlRemainingEnd );
  const segmentsRemaining = segmentator ( htmlRemaining );

  /* ADJUSTING REMAINING */

  if ( offsetStart ) {

    segmentsRemaining.forEach ( remaining => {

      remaining.start += offsetStart;
      remaining.end += offsetStart;

    });

  }

  /* ADJUSTING END */

  segmentsEnd.reverse ();

  const segmentEndFirst = segmentsEnd[0];
  const segmentRemainingLast = segmentsRemaining[segmentsRemaining.length - 1];
  const segmentsEndDelta = ( segmentEndFirst && segmentRemainingLast ) ? ( segmentRemainingLast.end - segmentEndFirst.start ) : 0;

  if ( segmentsEndDelta ) {

    segmentsEnd.forEach ( ending => {

      ending.start += segmentsEndDelta;
      ending.end += segmentsEndDelta;

    });

  }

  /* RETURN */

  return [...segmentsStart, ...segmentsRemaining, ...segmentsEnd];

};

/* EXPORT */

export default segmentator;
