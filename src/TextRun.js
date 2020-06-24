import React from 'react';

function TextRun({ node }) {
  const nodes = Array.prototype.slice.call(node.querySelectorAll('t'));
  return <span>{nodes.map((node) => node.textContent)}</span>;
}

export default TextRun;
