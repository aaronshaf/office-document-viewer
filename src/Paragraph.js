import React from 'react';

function Paragraph({ node }) {
  const nodes = Array.prototype.slice.call(node.querySelectorAll('t'));
  return <p>{nodes.map((node) => node.textContent)}</p>;
}

export default Paragraph;
