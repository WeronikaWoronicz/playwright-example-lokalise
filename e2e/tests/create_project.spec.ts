import { test, expect } from "@playwright/test"
import { Projects } from "../pages/Projects/Projects"
import { CreateProjects } from "../pages/CreateProject/CreateProject"
import { DataFactory } from "../fixtures/DataFactory"
import { LokaliseApiHelper, ApiHelper } from "../lib/LokaliseApiHelper"

let projects : Projects
let createProject : CreateProjects
const apiHelper: ApiHelper = new LokaliseApiHelper(process.env.API_KEY)


test.beforeEach(async ({ page }) => {
  projects = new Projects(page)
  createProject = new CreateProjects(page)

  await apiHelper.removeAllProjects()
  await projects.navigate("/projects")
})

test.afterAll(async ({ page }) => {
  await apiHelper.removeAllProjects()
})

test.describe("Adding Project", () => {
  test("first project should be created", async ({ page }) => {
     // arrange (preconditions)
    const projectData = DataFactory.getProject()
    
    // act (steps)
    await createProject.clickCreateFirstProjectBtn()
    await createProject.createProject(projectData)

    // assert (expected results)
    await createProject.expectProjectToBeVisible(projectData.name)
    await projects.navigate("/projects")
    await createProject.expectNumberOfProjectsVisibleToBe(1)
  })

  test("nth project should be added", async ({ page }) => {
    // arrange (preconditions)
    const projectData = DataFactory.getProject()
    const otherProjectData = DataFactory.getProject()
    await createProject.clickCreateFirstProjectBtn()
    await createProject.createProject(projectData)
    await projects.navigate("/projects")

    // act (steps)
    await createProject.clickCreateNewProjectBtn()
    await createProject.createProject(otherProjectData)

    // assert (expected results)
    await createProject.expectProjectToBeVisible(otherProjectData.name)
    await projects.navigate("/projects")
    await createProject.expectNumberOfProjectsVisibleToBe(2)

  })
})