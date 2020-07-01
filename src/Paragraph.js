import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';
import { extractStyles, inferTag } from './oo_utils';
import { stylesState } from './atoms';
import { useRecoilState } from 'recoil';

function Paragraph({ node }) {
  const [styleMap] = useRecoilState(stylesState);

  const styleValue = node.querySelector('pStyle')?.getAttribute('w:val');

  const id = node.getAttribute('w14:paraId');
  const childNodes = Array.from(node.childNodes);

  const children = childNodes.length ? (
    childNodes.map((node, i) => <OpenOfficeNode key={i} node={node} />)
  ) : (
    <br />
  );

  const isStylistic = (node) => ['w:pPr', 'w:rPr'].includes(node.tagName);

  const accChildNodes = childNodes.concat(
    Array.from(styleMap[styleValue]?.childNodes || [])
  );

  const styles = accChildNodes.filter(isStylistic).reduce((styles, current) => {
    return {
      ...styles,
      ...extractStyles(current),
    };
  }, {});

  const tag = inferTag(childNodes);
  if (tag === 'h1') {
    return (
      <h1 id={id} style={styles}>
        {children}
      </h1>
    );
  } else if (tag === 'h2') {
    return (
      <h2 id={id} style={styles}>
        {children}
      </h2>
    );
  } else {
    return (
      <div id={id} style={styles}>
        {children}
      </div>
    );
  }
}

export default Paragraph;
