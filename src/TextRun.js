import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';

const isStylistic = (node) => ['w:rPr'].includes(node.tagName);

const extractStyles = (node) => {
  const styles = {};
  Array.from(node.childNodes).forEach((node) => {
    switch (node.tagName) {
      case 'w:sz':
        styles.fontSize = `${node.getAttribute('w:val')}pt`;
        break;
      case 'w:b':
        styles.fontWeight = 'bold';
        break;
      case 'w:color':
        styles.color = `#${node.getAttribute('w:val')}`;
        break;
      case 'w:shd':
        styles.backgroundColor = `#${node.getAttribute('w:fill')}`;
        break;
      case 'w:i':
        styles.fontStyle = 'italic';
        break;
      case 'w:u':
        styles.textDecoration = 'underline';
        break;
      case 'bCs':
      case 'iCs':
      case 'szCs':
        return;
      default:
        console.warn(`Did not apply style ${node.tagName}`);
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
  const styles = childNodes.filter(isStylistic).reduce((styles, current) => {
    return {
      ...styles,
      ...extractStyles(current),
    };
  }, {});
  return <span style={styles}>{children}</span>;
}

export default TextRun;
