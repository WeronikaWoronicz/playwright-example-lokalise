import { test, expect } from "@playwright/test"
import { Projects } from "../pages/Projects/Projects"
import { CreateProjects } from "../pages/Project/CreateProject"
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
  test("first project should be created", async ({ page }) => {
    const createProject = new CreateProjects(page)

    await createProject.clickCreateFirstProjectBtn()
    await createProject.createProjectWithJustRequiredFields()


    //await expect(`a:text("${project.name}")`).toContainText(project.name)
    //const projectCreated = await page.locator(`a:text("${project.name}")`).isVisible()
    //expect(projectCreated).toBeTruthy()
    //await projects.navigateFromProjectToProjects()
   //const number = await page.locator('[data-name="project-container"]').count()
    //expect(number).toBe(1)
  })

  test("nth project should be added", async ({ page }) => {
    const projects = new Projects(page)
    const createProject = new CreateProjects(page)

    await createProject.clickCreateFirstProjectBtn()
    await createProject.createProjectWithJustRequiredFields()
    await projects.navigateFromProjectToProjects()
    await createProject.clickCreateNewProjectBtn()
    await expect(page).toHaveURL(
      "https://app.stage.lokalise.cloud/projects#modal:new-project"
    )
    await createProject.createProjectWithJustRequiredFields()

  })
})