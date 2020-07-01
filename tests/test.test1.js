import { Selector } from 'testcafe';

fixture`test1.docx`;

test('test1.docx', async (t) => {
  await t.navigateTo(
    `http://localhost:3000/?file=${encodeURIComponent(
      '/test-documents/test1.docx'
    )}#/`
  );

  let node;

  // Heading 1
  node = Selector('h1').withExactText('Heading 1');
  await t.expect(node.exists).ok('heading 1');

  // Heading 2
  node = Selector('h2').withExactText('Heading 2');
  await t.expect(node.exists).ok('heading 2');

  // Hyperlink
  node = Selector('a')
    .withAttribute('href', 'https://github.com/aaronshaf/docx-viewer')
    .withExactText('link');
  await t.expect(node.exists).ok('link');

  // Bold
  node = Selector('span')
    .withAttribute('style', 'font-weight: bold;')
    .withExactText('bold');
  await t.expect(node.exists).ok('bold text');

  // Italic
  node = Selector('span')
    .withAttribute('style', 'font-style: italic;')
    .withExactText('italicized');
  await t.expect(node.exists).ok('italicized text');

  // Underline
  node = Selector('span')
    .withAttribute('style', 'text-decoration: underline;')
    .withExactText('underlined');
  await t.expect(node.exists).ok('underlined text');

  // Red text
  node = Selector('span')
    .withAttribute('style', 'color: rgb(255, 0, 0);')
    .withExactText('red text');
  await t.expect(node.exists).ok('red text');

  // Red text
  node = Selector('span')
    .withAttribute('style', 'color: rgb(0, 112, 192);')
    .withExactText('blue text');
  await t.expect(node.exists).ok('blue text');

  // Green text
  node = Selector('span')
    .withAttribute('style', 'color: rgb(0, 176, 80);')
    .withExactText('green text');
  await t.expect(node.exists).ok('green text');

  // Image
  node = Selector('img').withAttribute('alt', 'No description');
  await t.expect(node.exists).ok('image');

  // Center-aligned text
  node = Selector('div')
    .withAttribute('style', 'text-align: center;')
    .withExactText('This text is center-aligned.');
  await t.expect(node.exists).ok('center-aligned text');

  // Right-aligned text
  node = Selector('div')
    .withAttribute('style', 'text-align: right;')
    .withExactText('This text is right-aligned.');
  await t.expect(node.exists).ok('right-aligned text');

  // Justified ("both") text
  node = Selector('div')
    .withAttribute('style', 'text-align: justify;')
    .withExactText(
      'This text is justified. This text is justified. This text is justified. This text is justified. This text is justified. This text is justified. This text is justified. This text is justified. This text is justified. This text is justified.'
    );
  await t.expect(node.exists).ok('Justified text');
});
