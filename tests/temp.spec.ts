import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://app.stage.lokalise.cloud/login?from=/projects
  await page.goto('https://app.stage.lokalise.cloud/login?from=/projects');

  // Click [placeholder="user\@company\.com"]
  await page.locator('[placeholder="user\\@company\\.com"]').click();

  // Click [placeholder="user\@company\.com"]
  await page.locator('[placeholder="user\\@company\\.com"]').click({
    button: 'right'
  });

  // Fill [placeholder="user\@company\.com"]
  await page.locator('[placeholder="user\\@company\\.com"]').fill('kebn1h0a7@mozmail.com');

  // Click [placeholder="password"]
  await page.locator('[placeholder="password"]').click({
    button: 'right'
  });

  // Fill [placeholder="password"]
  await page.locator('[placeholder="password"]').fill('TestAddicted456');

  // Click button:has-text("Log in")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects' }*/),
    page.locator('button:has-text("Log in")').click()
  ]);

  // Click button:has-text("Create project")
  await page.locator('button:has-text("Create project")').click();
  await expect(page).toHaveURL('https://app.stage.lokalise.cloud/quick-start');

  // Click .sc-fuISkM
  await page.locator('.sc-fuISkM').click();

  // Double click [placeholder="MyApp \(iOS \+ Android \+ Web\)"]
  await page.locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]').dblclick();

  // Fill [placeholder="MyApp \(iOS \+ Android \+ Web\)"]
  await page.locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]').fill('Test first project');

  // Click .Select__value-container.Select__value-container--is-multi .Select__input-container
  await page.locator('.Select__value-container.Select__value-container--is-multi .Select__input-container').click();

  // Fill text=Target languages option Abkhaz (ab) focused, 1 of 495. 495 results available. Us >> input[role="combobox"]
  await page.locator('text=Target languages option Abkhaz (ab) focused, 1 of 495. 495 results available. Us >> input[role="combobox"]').fill('spanish');

  // Click #react-select-3-option-397
  await page.locator('#react-select-3-option-397').click();

  // Click button:has-text("Proceed")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/upload/65231021626468195a3101.78837358/' }*/),
    page.locator('button:has-text("Proceed")').click()
  ]);

  // Click [aria-label="Close dialog"]
  await page.locator('[aria-label="Close dialog"]').click();

  // Click a:has-text("Projects")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects' }*/),
    page.locator('a:has-text("Projects")').click()
  ]);

  // Click button:has-text("New project")
  await page.locator('button:has-text("New project")').click();
  await expect(page).toHaveURL('https://app.stage.lokalise.cloud/projects#modal:new-project');

  // Fill [placeholder="MyApp \(iOS \+ Android \+ Web\)"]
  await page.locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]').fill('Test second project');

  // Click .Select__value-container.Select__value-container--is-multi .Select__input-container
  await page.locator('.Select__value-container.Select__value-container--is-multi .Select__input-container').click();

  // Fill text=Target languages option Abkhaz (ab) focused, 1 of 495. 495 results available. Us >> input[role="combobox"]
  await page.locator('text=Target languages option Abkhaz (ab) focused, 1 of 495. 495 results available. Us >> input[role="combobox"]').fill('Afrikaans');

  // Click #react-select-3-option-2
  await page.locator('#react-select-3-option-2').click();

  // Click #tabs--1--panel--0 button:has-text("Proceed")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/project/500095256264684ca7ed06.67384298/?view=multi' }*/),
    page.locator('#tabs--1--panel--0 button:has-text("Proceed")').click()
  ]);

  // Click text=Projects
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects' }*/),
    page.locator('text=Projects').click()
  ]);

  // Click text=Test first projectDone-Base words-Team1Keys0AppsInstall appsEditorUploadScreensh >> [aria-label="More\.\.\."]
  await page.locator('text=Test first projectDone-Base words-Team1Keys0AppsInstall appsEditorUploadScreensh >> [aria-label="More\\.\\.\\."]').click();

  // Click text=More...EditorUploadScreenshotsGlossaryAppsSettingsDuplicate finderAutomationsAct >> [aria-label="More\.\.\."]
  await page.locator('text=More...EditorUploadScreenshotsGlossaryAppsSettingsDuplicate finderAutomationsAct >> [aria-label="More\\.\\.\\."]').click();

  // Click text=Test first projectDone-Base words-Team1Keys0AppsInstall appsEditorUploadScreensh >> [aria-label="Editor"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/project/65231021626468195a3101.78837358/?view=multi' }*/),
    page.locator('text=Test first projectDone-Base words-Team1Keys0AppsInstall appsEditorUploadScreensh >> [aria-label="Editor"]').click()
  ]);

  // Click [aria-label="Add first key"]
  await page.locator('[aria-label="Add first key"]').click();

  // Fill [placeholder="Give the key a unique ID"]
  await page.locator('[placeholder="Give the key a unique ID"]').fill('cancel_button');

  // Click text=Platforms No matches foundNo matches foundNo matches found >> ul >> nth=0
  await page.locator('text=Platforms No matches foundNo matches foundNo matches found >> ul').first().click();

  // Click div[role="option"]:has-text("Web")
  await page.locator('div[role="option"]:has-text("Web")').click();

  // Click #btn_addkey
  await page.locator('#btn_addkey').click();

  // Click #transcell-310739385 div:has-text("Empty") >> nth=3
  await page.locator('#transcell-310739385 div:has-text("Empty")').nth(3).click();

  // Fill text=​x ​ MISSING ELEMENTS Alt+←→ - select, Alt+↓↑ - insert 0 Tab - next Mark as revi >> textarea
  await page.locator('text=​x ​ MISSING ELEMENTS Alt+←→ - select, Alt+↓↑ - insert 0 Tab - next Mark as revi >> textarea').fill('Cancel');

  // Click text=MISSING ELEMENTS Alt+←→ - select, Alt+↓↑ - insert 6 Tab - next Mark as reviewed >> button >> nth=0
  await page.locator('text=MISSING ELEMENTS Alt+←→ - select, Alt+↓↑ - insert 6 Tab - next Mark as reviewed >> button').first().click();

  // Click #transcell-310739385 >> text=Cancel
  await page.locator('#transcell-310739385 >> text=Cancel').click();

  // Click #transcell-310739386 div:has-text("Empty") >> nth=2
  await page.locator('#transcell-310739386 div:has-text("Empty")').nth(2).click();

  // Click text=Cancelar >> nth=0
  await page.locator('text=Cancelar').first().click();

  // Click text=MISSING ELEMENTS Alt+←→ - select, Alt+↓↑ - insert Insert source 8 Tab - next Mar >> button >> nth=0
  await page.locator('text=MISSING ELEMENTS Alt+←→ - select, Alt+↓↑ - insert Insert source 8 Tab - next Mar >> button').first().click();

});