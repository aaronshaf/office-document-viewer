import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';
import { extractStyles } from './oo_utils';

function Paragraph({ node }) {
  const id = node.getAttribute('w14:paraId');
  const childNodes = Array.from(node.childNodes);

  const children = childNodes.length ? (
    childNodes.map((node, i) => <OpenOfficeNode key={i} node={node} />)
  ) : (
    <br />
  );

  const isStylistic = (node) => ['w:pPr'].includes(node.tagName);

  const styles = childNodes.filter(isStylistic).reduce((styles, current) => {
    return {
      ...styles,
      ...extractStyles(current),
    };
  }, {});

  return (
    <p id={id} style={styles}>
      {children}
    </p>
  );
}

export default Paragraph;
