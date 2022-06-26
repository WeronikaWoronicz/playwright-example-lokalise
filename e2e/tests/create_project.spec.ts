import { test, expect } from "@playwright/test"
import { Projects } from "../pages/Projects/Projects"
import { CreateProjects } from "../pages/CreateProject/CreateProject"
import { project } from "../fixtures/project"
import { LokaliseApiHelper, ApiHelper } from "../lib/lokaliseApiHelper"

test.beforeEach(async ({ page }) => {
  const projects = new Projects(page)
  const createProject = new CreateProjects(page)
  const apiHelper: ApiHelper = new LokaliseApiHelper(process.env.API_KEY)

  await apiHelper.removeAllProjects()
  await projects.navigate("/projects")
  await createProject.clickCreateFirstProjectBtn()
  await createProject.createProjectWithJustRequiredFields(project.name)

})

test.afterAll(async ({ page }) => {
  const apiHelper: ApiHelper = new LokaliseApiHelper(process.env.API_KEY)

  await apiHelper.removeAllProjects()
})

test.describe("Adding Project", () => {
  test("first project should be created", async ({ page }) => {
    const createProject = new CreateProjects(page)
    const projects = new Projects(page)

    // assert (expected results)
    await createProject.expectThatCreatedProjectIsVisible(project.name)
    await projects.navigate("/projects")
    await createProject.expectNumberOfProjectsVisibleIs(1)
  })

  test("nth project should be added", async ({ page }) => {
    // arrange (preconditions)
    const createProject = new CreateProjects(page)
    const projects = new Projects(page)

    await projects.navigate("/projects")

    // act (steps)
    await createProject.clickCreateNewProjectBtn()
    await createProject.createProjectWithJustRequiredFields(project.otherName)

    // assert (expected results)
    await createProject.expectThatCreatedProjectIsVisible(project.otherName)
    await projects.navigate("/projects")
    await createProject.expectNumberOfProjectsVisibleIs(2)

  })
})