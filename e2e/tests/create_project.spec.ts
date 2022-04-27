import { test, expect, Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://app.stage.lokalise.cloud')
  await page.locator('[placeholder="user\\@company\\.com"]').fill('kebn1h0a7@mozmail.com')
  await page.locator('[placeholder="password"]').click()
  await page.locator('[placeholder="password"]').fill('TestAddicted456')
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects' }*/),
    page.locator('button:has-text("Log in")').click()
  ])
})

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
]

test.afterAll(async ({page}) => {
 
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects' }*/),
    page.locator('text=Projects').click()
  ])
  while(await page.locator('[aria-label="More\\.\\.\\."] >> nth=0').isVisible()) {
 
    await page.locator('[aria-label="More\\.\\.\\."] >> nth=0').click()

    await page.locator('[role=menuitem][aria-label="Settings"]').first().click()
    const projectName = await page.locator('[placeholder="Project name"]').inputValue()
    await page.locator('text=Delete project').click()
    // await page.locator('.bootbox-input').click({
    //   button: 'right'
    // })
    await page.locator('.bootbox-input').fill(projectName)
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects/' }*/),
      page.locator('button:has-text("Delete project")').click()
    ])
  }


})

test.describe('Adding Project', () => {
  test.only('first project should be created', async ({ page }) => {
   // Click Create project button
   await page.locator('text=Create project').click()

   // Double click [placeholder="MyApp \(iOS \+ Android \+ Web\)"]
   await page.locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]').dblclick()
 
   // Fill [placeholder="MyApp \(iOS \+ Android \+ Web\)"]
   await page.locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]').fill('Test first project')
 
   // Click .Select__value-container.Select__value-container--is-multi .Select__input-container
   await page.locator('.Select__value-container.Select__value-container--is-multi .Select__input-container').click()
 
   // Fill text=Target languages option Abkhaz (ab) focused, 1 of 495. 495 results available. Us >> input[role="combobox"]
   await page.locator('text=Target languages option Abkhaz (ab) focused, 1 of 495. 495 results available. Us >> input[role="combobox"]').fill('spanish') //Write better select !!!!! 
   
     // Click #react-select-3-option-397
  await page.locator('#react-select-3-option-397').click()

  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/upload/65231021626468195a3101.78837358/' }*/),
    page.locator('button:visible:has-text("Proceed")').click()
  ])

  }) 

  test('nth project should be added', async ({ page }) => {
  // Click button:has-text("New project")
  await page.locator('button:has-text("New project")').click()
  await expect(page).toHaveURL('https://app.stage.lokalise.cloud/projects#modal:new-project')
  // Fill [placeholder="MyApp \(iOS \+ Android \+ Web\)"]
  await page.locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]').fill('Test second project')

  // Click .Select__value-container.Select__value-container--is-multi .Select__input-container
  await page.locator('.Select__value-container.Select__value-container--is-multi .Select__input-container').click()

  // Fill text=Target languages option Abkhaz (ab) focused, 1 of 495. 495 results available. Us >> input[role="combobox"]
  await page.locator('text=Target languages option Abkhaz (ab) focused, 1 of 495. 495 results available. Us >> input[role="combobox"]').fill('Afrikaans')

  // Click #react-select-3-option-2
  await page.locator('#react-select-3-option-2').click()

  // Click button:has-text("Proceed")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/upload/65231021626468195a3101.78837358/' }*/),
    page.locator('button:visible:has-text("Proceed")').click()
  ])

  })


})


test.describe('Add key', () => {
  test.only('first key should be added in key editor', async ({ page }) => {
    Promise.all([
   //   await page.waitForNavigation(),
      await page.locator('a:text("Test first project")').click()
    ])
    await page.locator('[aria-label="Add first key"]').click()
    await page.locator('#keyName').fill('Login')
    await page.locator('#s2id_autogen6').fill('Web')
    await page.locator('#s2id_autogen6').press('Enter')
    await page.locator('#btn_addkey').click()
  })

 ''



