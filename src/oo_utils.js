export const inferTag = (nodes) => {
  const isStylistic = (node) => ['w:pPr'].includes(node.tagName);

  let tag = 'div';
  Array.from(nodes)
    .filter(isStylistic)
    .reduce((acc, current) => {
      return acc.concat(Array.from(current.children));
    }, [])
    .forEach((node) => {
      switch (node.tagName) {
        case 'w:pStyle':
          if (node.getAttribute('w:val') === 'Heading1') {
            tag = 'h1';
          } else if (node.getAttribute('w:val') === 'Heading2') {
            tag = 'h2';
          } else if (node.getAttribute('w:val') === 'Heading3') {
            tag = 'h3';
          } else if (node.getAttribute('w:val') === 'Heading4') {
            tag = 'h4';
          }
          break;
        default:
          return;
      }
    });
  return tag;
};
