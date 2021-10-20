
/* IMPORT */

import {Node, NodeWithChildren, Text} from 'domhandler';

/* MAIN */

//TODO: Maybe trim the appropriate spaces/tabs-only text nodes too

const trim = <T extends Node> ( node: T ): T => {

  if ( node instanceof NodeWithChildren && !/^(script|style|pre|textarea)$/i.test ( node['name'] || '' ) ) {

    for ( let i = node.childNodes.length - 1; i >= 0; i-- ) {

      const child = node.childNodes[i];

      if ( child instanceof Text && /^(?:\r?\n|\r)*$/.test ( child.data ) ) {

        node.childNodes.splice ( i, 1 );

      } else {

        trim ( child );

      }

    }

  }

  return node;

};

/* EXPORT */

export default trim;
