import { test, expect } from "@playwright/test"
import { Projects } from "../pages/Projects/Projects"
import { project } from "../fixtures/project"

test.beforeEach(async ({ page }) => { 
const projects = new Projects(page)

  await projects.navigate()
})

test.afterAll(async ({ page }) => {
  const projects = new Projects(page)

  await projects.navigateFromProjectToProjects()
  await projects.removeAllProjects()
})

test.describe("Adding Project", () => {
  test("first project should be created", async ({ page }) => {
    const projects = new Projects(page)
  
    await projects.clickCreateFirstProjectBtn()
    await projects.typeProjectName()
    await page.locator("#react-select-3-input").fill("Spanish (es)")
    await page.locator("#react-select-3-input").press("Enter")
    await page.locator('button:visible:has-text("Proceed")').click()
    await page.click('[aria-label="Close dialog"]')
    await page.locator(`a:text("${project.name}")`).isVisible()
  })

  test("nth project should be added", async ({ page }) => {
    
    await page.locator('button:has-text("New project")').click()
    await expect(page).toHaveURL(
      "https://app.stage.lokalise.cloud/projects#modal:new-project"
    )
    await page
      .locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]')
      .fill(project.otherName)
    await page.locator("#react-select-3-input").fill("Spanish (es)")
    await page.locator("#react-select-3-input").press("Enter")
    await Promise.all([
      page.waitForNavigation(),
      page.locator('button:visible:has-text("Proceed")').click(),
    ])
  })
})