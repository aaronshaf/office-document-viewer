import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';

function Paragraph({ node }) {
  const id = node.getAttribute('w14:paraId');
  const childNodes = Array.from(node.childNodes);
  const children = childNodes.length ? (
    childNodes.map((node, i) => <OpenOfficeNode key={i} node={node} />)
  ) : (
    <br />
  );
  return <p id={id}>{children}</p>;
}

export default Paragraph;
