import { test, expect, Page } from "@playwright/test"
import { faker } from "@faker-js/faker"

const firstProjectName = "Test first project" + faker.random.word()
const secondProjectName = "Test second project" + faker.random.word()

test.beforeEach(async ({ page }) => {
  await page.goto("https://app.stage.lokalise.cloud")
  await page
    .locator('[placeholder="user\\@company\\.com"]')
    .fill("kebn1h0a7@mozmail.com")
  await page.locator('[placeholder="password"]').click()
  await page.locator('[placeholder="password"]').fill("TestAddicted456")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects' }*/),
    page.locator('button:has-text("Log in")').click(),
  ])
})

test.afterAll(async ({ page }) => {
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects' }*/),
    page.locator("text=Projects").click(),
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
      page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects/' }*/),
      page.locator('button:has-text("Delete project")').click(),
    ])
  }
})

test.describe("Adding Project", () => {
  test("first project should be created", async ({ page }) => {
    await page.locator("text=Create project").click()
    await page
      .locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]')
      .fill(firstProjectName)
    await page.locator("#react-select-3-input").fill("Spanish (es)")
    await page.locator("#react-select-3-input").press("Enter")
    await page.locator('button:visible:has-text("Proceed")').click()
  })

  test("nth project should be added", async ({ page }) => {
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
      page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/upload/65231021626468195a3101.78837358/' }*/),
      page.locator('button:visible:has-text("Proceed")').click(),
    ])
  })
})