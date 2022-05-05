import { test, expect } from "@playwright/test"
import { Projects } from "../pages/Projects/Projects"
import { CreateProjects } from "../pages/CreateProject/CreateProject"
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
    
    // act (steps)
    await createProject.clickCreateFirstProjectBtn()
    await createProject.createProjectWithJustRequiredFields(project.name)

    // assert (expected results)
    await createProject.expectThatCreatedProjectIsVisible(project.name)
    await projects.navigateFromProjectToProjects()
    await createProject.expectNumberOfProjectsVisibleIs(1) 
  })

  test("nth project should be added", async ({ page }) => {
    // arrange (preconditions)
    const createProject = new CreateProjects(page)
    const projects = new Projects(page)
    await createProject.clickCreateFirstProjectBtn()
    await createProject.createProjectWithJustRequiredFields(project.name)
    await projects.navigateFromProjectToProjects()

    // act (steps)
    await createProject.clickCreateNewProjectBtn()
    await createProject.createProjectWithJustRequiredFields(project.otherName)
    
    // assert (expected results)
    await createProject.expectThatCreatedProjectIsVisible(project.otherName)
    await projects.navigateFromProjectToProjects()
    await createProject.expectNumberOfProjectsVisibleIs(2)

  })
})