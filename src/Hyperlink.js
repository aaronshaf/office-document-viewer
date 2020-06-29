import React from 'react';
import OpenOfficeNode from './OpenOfficeNode';
import { relationshipsState } from './atoms';
import { useRecoilValue } from 'recoil';

function Hyperlink({ node }) {
  const relationships = useRecoilValue(relationshipsState);

  const children = Array.from(node.childNodes).map((node, i) => (
    <OpenOfficeNode key={i} node={node} />
  ));

  const relationshipId = node.getAttribute('r:id');
  return (
    <a
      href={relationships[relationshipId]?.getAttribute('Target') || '#_'}
      target={
        relationships[relationshipId]?.getAttribute('TargetMode') === 'External'
          ? '_top'
          : ''
      }
    >
      {children}
    </a>
  );
}

export default Hyperlink;
