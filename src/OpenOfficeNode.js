import React from 'react';
import Paragraph from './Paragraph';

function OpenOfficeNode({ node }) {
  let nodes = [];

  switch (node.tagName) {
    case 'w:p':
      nodes.push(<Paragraph key={nodes.length} node={node} />);
      break;
    default:
      break;
  }
  // console.log(childNode.tagName);

  return <>{nodes}</>;
}

export default OpenOfficeNode;
