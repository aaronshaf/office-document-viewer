import React from 'react';
import Hyperlink from './Hyperlink';
import Paragraph from './Paragraph';
import TextRun from './TextRun';

function OpenOfficeNode({ node }) {
  let nodes = [];

  switch (node.tagName) {
    case 'w:p':
      return <Paragraph key={nodes.length} node={node} />;
    case 'w:r':
      return <TextRun key={nodes.length} node={node} />;
    case 'w:hyperlink':
      return <Hyperlink key={nodes.length} node={node} />;
    case 'w:t':
      return <>{node.textContent}</>;
    default:
      console.warn(`Did not parse tag ${node.tagName}`);
      return <></>;
  }
}

export default OpenOfficeNode;
