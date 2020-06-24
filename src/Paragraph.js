import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';

function Paragraph({ node }) {
  const id = node.getAttribute('w14:paraId');
  const children = Array.from(node.childNodes).map((node, i) => (
    <OpenOfficeNode key={i} node={node} />
  ));
  return <p id={id}>{children}</p>;
}

export default Paragraph;
