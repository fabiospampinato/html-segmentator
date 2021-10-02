
/* IMPORT */

import {DomHandler, Document} from 'domhandler';
import {Parser} from './Parser';

/* MAIN */

// Stripped down htmlparser2.parseDocument basically

const parse = ( html: string ): Document => {

  const options = { decodeEntities: false, withStartIndices: true, withEndIndices: true };
  const handler = new DomHandler ( undefined, options );
  const parser = new Parser ( handler, options );

  parser.end ( html );

  return handler.root;

};

/* EXPORT */

export default parse;
