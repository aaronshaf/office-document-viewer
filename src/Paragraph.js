import React from 'react';

function Paragraph({ node }) {
  const nodes = Array.prototype.slice.call(node.querySelectorAll('t'));
  const id = node.getAttribute('w14:paraId');
  return <p id={id}>{nodes.map((node) => node.textContent)}</p>;
}

export default Paragraph;
