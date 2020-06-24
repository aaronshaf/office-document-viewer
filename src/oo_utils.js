export const isStylistic = (node) => ['w:rPr', 'w:pPr'].includes(node.tagName);

export const extractStyles = (node) => {
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
