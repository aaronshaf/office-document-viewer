import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';

function TextRun({ node }) {
  const children = Array.from(node.childNodes).map((node, i) => (
    <OpenOfficeNode key={i} node={node} />
  ));
  const styles = {};
  return <span style={styles}>{children}</span>;
}

export default TextRun;
