import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';

function Hyperlink({ node }) {
  const children = Array.from(node.childNodes).map((node, i) => (
    <OpenOfficeNode key={i} node={node} />
  ));
  return <a href="#">{children}</a>;
}

export default Hyperlink;
