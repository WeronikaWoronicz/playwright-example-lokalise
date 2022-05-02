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
    await createProject.createdProjectIsVisible()
    await projects.navigateFromProjectToProjects()
    await createProject.numberOfProjectsIsVisible(1) 
  })

  test("nth project should be added", async ({ page }) => {
    const projects = new Projects(page)
    const createProject = new CreateProjects(page)

    await createProject.clickCreateFirstProjectBtn()
    await createProject.createProjectWithJustRequiredFields()
    await projects.navigateFromProjectToProjects()
    await createProject.clickCreateNewProjectBtn()
    await createProject.createProjectWithJustRequiredFields()
    await createProject.createdProjectIsVisible()
    await projects.navigateFromProjectToProjects()
    await createProject.numberOfProjectsIsVisible(2)

  })
})