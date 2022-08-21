
/* IMPORT */

import {ELEMENTS_VOIDS} from './constants';
import {tokenize} from './tokenizer';
import {TokenKind} from './tokenizer';
import type {Segment} from './types';

/* MAIN */

const segmentator = ( html: string ): Segment[] => {

  /* VARIABLES */

  const tokens =  tokenize ( html );
  const segments: Segment[] = [];

  let stackCount = 0;
  let stackStart = 0;
  let stackVoid = false;

  /* PROCESSING TOKENS */

  tokens.forEach ( ({ type, start, end, value }) => {

    if ( type === TokenKind.Literal ) {

      if ( stackCount ) return;

      segments.push ({ start, end });

    } else if ( type === TokenKind.OpenTag ) {

      stackStart = stackCount ? stackStart : start - 1;
      stackCount += 1;
      stackVoid = ELEMENTS_VOIDS.has ( value );

    } else if ( type === TokenKind.CloseTag || ( type === TokenKind.OpenTagEnd && ( stackVoid || value === '/' || value === '--' ) ) ) {

      if ( !stackCount ) return;

      stackCount -= 1;

      if ( !stackCount ) segments.push ({ start: stackStart, end: end + 1 });

    }

  });

  if ( stackCount ) {

    segments.push ({ start: stackStart, end: html.length });

  }

  /* RETURN */

  return segments;

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
  const segmentEndBefore = segmentsRemaining[segmentsRemaining.length - 1] || segmentsStart[segmentsStart.length - 1] || { start: 0, end: 0 };
  const segmentsEndDelta = segmentEndFirst ? ( segmentEndBefore.end - segmentEndFirst.start ) : 0;

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
