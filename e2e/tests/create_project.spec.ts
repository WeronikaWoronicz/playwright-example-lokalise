import { test, expect } from "@playwright/test"
import { Projects } from "../pages/Projects/Projects"
import { CreateProjects } from "../pages/Project/CreateProject"
import { project } from "../fixtures/project"

test.beforeEach(async ({ page }) => { 
const projects = new Projects(page)

  await projects.navigate()
  await projects.removeAllProjects()
})

test.afterAll(async ({ page }) => {
  const projects = new Projects(page)
  await projects.navigate()
  await projects.removeAllProjects()
})

test.describe("Adding Project", () => {
  test("first project should be created", async ({ page }) => {
    const createProject = new CreateProjects(page)
    const projects = new Projects(page)

    await createProject.clickCreateFirstProjectBtn()
    await createProject.createProjectWithJustRequiredFields()
    await page.waitForNavigation()
    const projectIsVisible = await page.isVisible(`a:text("${project.name}")`)
    expect(projectIsVisible).toBe(true)
    await projects.navigateFromProjectToProjects()
    await page.waitForSelector('[data-name="project-container"]')
    const projectNumber = await page.locator('[data-name="project-container"]').count()
    console.log(projectNumber)
    expect(projectNumber).toBe(1)
    console.log(`There ${projectNumber} projects visible`)

  })

  test("nth project should be added", async ({ page }) => {
    const projects = new Projects(page)
    const createProject = new CreateProjects(page)

    await createProject.clickCreateFirstProjectBtn()
    await createProject.createProjectWithJustRequiredFields()
    await projects.navigateFromProjectToProjects()
    await createProject.clickCreateNewProjectBtn()
    await createProject.createProjectWithJustRequiredFields()
    await page.waitForNavigation()
    const projectIsVisible = await page.isVisible(`a:text("${project.name}")`)
    expect(projectIsVisible).toBe(true)
    console.log('Project\'s is created and project\'s page is opened')
    await projects.navigateFromProjectToProjects()
    await page.waitForSelector('[data-name="project-container"]')
    const projectNumber = await page.locator('[data-name="project-container"]').count()
    expect(projectNumber).toBe(2)
    console.log(`There ${projectNumber} projects visible`)

  })
})