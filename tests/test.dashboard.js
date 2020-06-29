import { Selector } from 'testcafe';

fixture`Dashboard`;

test('Loads', async (t) => {
  const pagesSidebarLink = Selector('h1').withExactText('DOCX Viewer');
  await t.navigateTo(`http://localhost:5000/`);
  await t.expect(pagesSidebarLink.exists).ok();
});
