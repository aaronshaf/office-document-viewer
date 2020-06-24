import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';

const stylistic = (node) => ['w:rPr'].includes(node.tagName);

const extractStyles = (node) => {
  const styles = {};
  Array.from(node.childNodes).forEach((node) => {
    switch (node.tagName) {
      case 'w:sz':
        styles.fontSize = `${node.getAttribute('w:val')}pt`;
        break;
      case 'szCs':
        return;
      default:
        console.warn(`Did not parse tag ${node.tagName}`);
        return;
    }
  });
  return styles;
};

function TextRun({ node }) {
  const childNodes = Array.from(node.childNodes);
  const children = childNodes.map((node, i) => (
    <OpenOfficeNode key={i} node={node} />
  ));
  const styles = childNodes.filter(stylistic).reduce((styles, current) => {
    return {
      ...styles,
      ...extractStyles(current),
    };
  }, {});
  return <span style={styles}>{children}</span>;
}

export default TextRun;
