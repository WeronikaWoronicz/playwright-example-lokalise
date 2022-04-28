import { test, expect, Page } from "@playwright/test"
import { faker } from "@faker-js/faker"


test.beforeEach(async ({ page }) => {
  await Promise.all([
    await page.goto("https://app.stage.lokalise.cloud/projects"),
    page.waitForNavigation({ url: 'https://app.stage.lokalise.cloud/projects' })
  ])
})

test.afterAll(async ({ page }) => {
  await Promise.all([
    page.waitForNavigation({ url: 'https://app.stage.lokalise.cloud/projects' }),
    page.locator("text=Projects").click(),
  ])
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
})

test.describe("Adding Project", () => {
  test("first project should be created", async ({ page }) => {
    const firstProjectName = "Test first project" + faker.random.word()
    await page.locator("text=Create project").click()
    await page
      .locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]')
      .fill(firstProjectName)
    await page.locator("#react-select-3-input").fill("Spanish (es)")
    await page.locator("#react-select-3-input").press("Enter")
    await page.locator('button:visible:has-text("Proceed")').click()
    await page.click('[aria-label="Close dialog"]')
  })

  test("nth project should be added", async ({ page }) => {
    const secondProjectName = "Test second project" + faker.random.word()
    await page.locator('button:has-text("New project")').click()
    await expect(page).toHaveURL(
      "https://app.stage.lokalise.cloud/projects#modal:new-project"
    )
    await page
      .locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]')
      .fill(secondProjectName)
    await page.locator("#react-select-3-input").fill("Spanish (es)")
    await page.locator("#react-select-3-input").press("Enter")
    await Promise.all([
      page.waitForNavigation(),
      page.locator('button:visible:has-text("Proceed")').click(),
    ])
  })
})