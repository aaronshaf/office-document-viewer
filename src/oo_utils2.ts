export const extractStyles = (node: HTMLElement) => {
  const styles: Partial<CSSStyleDeclaration> = {};

  Array.from(node.children).forEach((node) => {
    switch (node.tagName) {
      case 'w:rFonts':
        {
          const asciiFont = node.getAttribute('w:ascii');
          const hAnsiFont = node.getAttribute('w:hAnsi');
          const csFont = node.getAttribute('w:cs');
          const eastAsia = node.getAttribute('w:eastAsia');

          const fontsArray = [asciiFont, hAnsiFont, csFont, eastAsia]
            .filter((x) => x)
            .map((x) => JSON.stringify(x));
          const fonts = Array.from(new Set(fontsArray));

          if (fonts.length > 0) {
            styles.fontFamily = fonts.join(', ');
          }
        }
        break;
      case 'w:jc':
        {
          const val = node.getAttribute('w:val');
          if (val) {
            styles.textAlign = val === 'both' ? 'justify' : val;
          }
        }
        break;
      case 'w:sz':
        {
          const val = node.getAttribute('w:val');
          if (val) {
            styles.fontSize = `${parseInt(val, 10) / 2}pt`;
          }
        }
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
