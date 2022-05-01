import { test, expect } from "@playwright/test"
import { Projects } from "../pages/Projects/Projects"
import { Login } from "../pages/login/Login"
import { project } from "../fixtures/project"

test.beforeEach(async ({ page }) => { 
const projects = new Projects(page)

  await projects.navigate()
  await projects.removeAllProjects()
})

test.afterEach(async ({ page }) => {
  const projects = new Projects(page)
  await projects.navigate()
  await projects.removeAllProjects()
})

test.describe("Adding Project", () => {
  test.only("first project should be created", async ({ page }) => {
    const projects = new Projects(page)

    await projects.clickCreateFirstProjectBtn()
    await projects.typeProjectName()
    await page.locator("#react-select-3-input").fill("Spanish (es)")
    await page.locator("#react-select-3-input").press("Enter")
    await page.locator('button:visible:has-text("Proceed")').click()
    await page.click('[aria-label="Close dialog"]')
    await projects.navigateFromProjectToProjects()
    //await expect(`a:text("${project.name}")`).toContainText(project.name)
    //const projectCreated = await page.locator(`a:text("${project.name}")`).isVisible()
    //expect(projectCreated).toBeTruthy()
    //await projects.navigateFromProjectToProjects()
   //const number = await page.locator('[data-name="project-container"]').count()
    //expect(number).toBe(1)
  })

  test("nth project should be added", async ({ page }) => {
    const projects = new Projects(page)

    await projects.navigate()
    await projects.clickCreateFirstProjectBtn()
    await projects.typeProjectName()
    await page.locator("#react-select-3-input").fill("Spanish (es)")
    await page.locator("#react-select-3-input").press("Enter")
    await page.locator('button:visible:has-text("Proceed")').click()
    await page.click('[aria-label="Close dialog"]')
    await projects.navigateFromProjectToProjects()
    await page.locator('button:has-text("New project")').click()
    await expect(page).toHaveURL(
      "https://app.stage.lokalise.cloud/projects#modal:new-project"
    )
    await page
      .locator('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]')
      .fill(project.otherName)
    await page.locator("#react-select-3-input").fill("Spanish (es)")
    await page.locator("#react-select-3-input").press("Enter")
    await page.locator('button:visible:has-text("Proceed")').click()
  })
})