export const isStylistic = (node) => ['w:rPr', 'w:pPr'].includes(node.tagName);

export const inferTag = (nodes) => {
  const isStylistic = (node) => ['w:pPr'].includes(node.tagName);

  let tag = 'div';
  Array.from(nodes)
    .filter(isStylistic)
    .reduce((acc, current) => {
      return acc.concat(Array.from(current.childNodes));
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

export const extractStyles = (node) => {
  const styles = {};
  Array.from(node.childNodes).forEach((node) => {
    switch (node.tagName) {
      case 'w:sz':
        styles.fontSize = `${parseInt(node.getAttribute('w:val'), 10) / 2}pt`;
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
      case 'w:pStyle':
        if (node.getAttribute('w:val') === 'ListParagraph') {
          styles.display = 'list-item';
        }
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
