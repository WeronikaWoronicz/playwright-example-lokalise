import { test, expect, Page } from "@playwright/test"
import { project } from "../fixtures/project"

test.beforeEach(async ({ page }) => {
  await page.goto("https://app.stage.lokalise.cloud/projects")
  while (
    await page.locator('[aria-label="More\\.\\.\\."] >> nth=0').isVisible()
  ) {
    await page.click('[aria-label="More\\.\\.\\."] >> nth=0')
    await page
      .locator('[role=menuitem][aria-label="Settings"]')
      .first()
      .click()
    const projectName = await page
      .locator('[placeholder="Project name"]')
      .inputValue()
    await page.locator("text=Delete project").click()
    await page.locator(".bootbox-input").fill(projectName)
    await Promise.all([
      page.waitForNavigation({ url: 'https://app.stage.lokalise.cloud/projects/' }),
      page.locator('button:has-text("Delete project")').click(),
    ])
  }
  await page.locator("text=Create project").click()
  await page
    .locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]')
    .fill(project.name)
  await page.locator("#react-select-3-input").fill("Spanish (es)")
  await page.locator("#react-select-3-input").press("Enter")
  await page.locator('button:visible:has-text("Proceed")').click()
  await page.waitForNavigation()
  await page.locator(`a:text("${project.name}")`).isVisible()
  await page.click('[aria-label="Close dialog"]')
  await page.click('[data-testid="edit"]')
})

test.afterAll(async ({ page }) => {
  await Promise.all([
    page.waitForNavigation(),
    page.locator('a:text("Projects")').click(),
  ])
  while (
    await page.locator('[aria-label="More\\.\\.\\."] >> nth=0').isVisible()
  ) {
    await page.locator('[aria-label="More\\.\\.\\."] >> nth=0').click()
    await page
      .locator('[role=menuitem][aria-label="Settings"]')
      .first()
      .click()
    const projectName = await page
      .locator('[placeholder="Project name"]')
      .inputValue()
    await page.locator("text=Delete project").click()
    await page.locator(".bootbox-input").fill(projectName)
    await Promise.all([
      page.waitForNavigation(),
      page.locator('button:has-text("Delete project")').click(),
    ])
  }
})


test.describe("Add key", () => {
  test("first key should be added in key editor", async ({ page }) => {
    await page.locator('[aria-label="Add first key"]').click()
    await page.locator("#keyName").fill("Login")
    await page.locator("#s2id_autogen6").fill("Web")
    await page.locator("#s2id_autogen6").press("Enter")
    
  })

  test("translation for plain key should be added", async ({ page }) => {
    await page.locator('[aria-label="Add first key"]').click()
    await page.locator("#keyName").fill("Login")
    await page.locator("#s2id_autogen6").fill("Web")
    await page.locator("#s2id_autogen6").press("Enter")
    await page.click("#btn_addkey")
    await page.locator(`a:text("${project.name}")`).isVisible()
    let dataId = await page
      .locator("tr.row-trans.translation:nth-child(1)")
      .getAttribute("data-id")
    await page.locator(`#transcell-${dataId}`).click()
    await page.locator(`#transcell-${dataId}`).type("Login")
    let dataIdSecond = await page
      .locator("tr.row-trans.translation:nth-child(2)")
      .getAttribute("data-id")
    await page.locator(`#transcell-${dataIdSecond}`).click()
    await page.locator(`#transcell-${dataIdSecond}`).press("Alt+1")
  })

  test("translation for plural key should be added", async ({ page }) => {
    await page.locator('[aria-label="Add first key"]').click()
    await page.locator("#keyName").fill("The End")
    await page.locator("#s2id_autogen6").fill("Web")
    await page.locator("#s2id_autogen6").press("Enter")
    await page.locator("#advanced_tab").click()
    await page
      .locator(
        '[class="bootstrap-switch-handle-off bootstrap-switch-default"] >> nth=3'
      )
      .click()
    await page.click("#btn_addkey")
    await page.click('[data-lokalise-editor-plural="one"] >> nth=0')
    await page.type('[class="CodeMirror-line"]', 'cat')
    await page.click('[alt="save"]')
    await page.click('[data-lokalise-editor-plural="other"] >> nth=0')
    await page.type('[class="CodeMirror-line"]', 'cats')
    await page.click('[alt="save"]')
    await page.click('[data-lokalise-editor-plural="one"] >> nth=1')
    await page.type('[class="CodeMirror-line"]', 'el gato')
    await page.click('[alt="save"]')
    await page.click('[data-lokalise-editor-plural="other"] >> nth=1')
    await page.type('[class="CodeMirror-line"]', 'los gatos')
    await page.click('[alt="save"]')  
  })
})