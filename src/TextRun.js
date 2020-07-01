import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';
import { extractStyles } from './oo_utils2';

function TextRun({ node }) {
  const childNodes = Array.from(node.children);
  const children = childNodes.map((node, i) => (
    <OpenOfficeNode key={i} node={node} />
  ));

  const isStylistic = (node) => ['w:rPr'].includes(node.tagName);

  const styles = childNodes.filter(isStylistic).reduce((styles, current) => {
    return {
      ...styles,
      ...extractStyles(current),
    };
  }, {});
  return <span style={styles}>{children}</span>;
}

export default TextRun;
