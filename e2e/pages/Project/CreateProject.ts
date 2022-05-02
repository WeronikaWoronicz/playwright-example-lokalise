import type { Page, Response } from "@playwright/test"
import { project } from "../../fixtures/project"
import { expect } from "@playwright/test"
const createProjectSelectors = require("./CreateProjectSelectors")

export class CreateProjects {
 
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  clickCreateFirstProjectBtn(): Promise<void> {
    return this.page.click(createProjectSelectors.buttons.getStarted)
  }

  clickCreateNewProjectBtn(): Promise<void> {
    return this.page.click(createProjectSelectors.buttons.newProject)
  }

  clickProceedToCreateProjectBtn(): Promise<void> {
    return this.page.click(createProjectSelectors.buttons.proceed)
  }

  confirmTargetOneLanguage(): Promise<void> {
    return this.page
      .press(createProjectSelectors.input.targetLanguage,createProjectSelectors.key.enter)
}

  fillProjectName(): Promise<void> {
    return this.page
      .fill(createProjectSelectors.input.projectName, project.name)
  }

  fillTargetOneLanguage(): Promise<void> {
    return this.page
      .fill(createProjectSelectors.input.targetLanguage, "Spanish (es)")  
  }

  async createProjectWithJustRequiredFields(): Promise<void> {
      await this.fillProjectName()
      await this.fillTargetOneLanguage()
      await this.confirmTargetOneLanguage()
      await this.clickProceedToCreateProjectBtn()
      return
  }

//Assertions

  async createdProjectIsVisible(): Promise<void> {
    await this.page.waitForNavigation()
    const projectIsVisible = await this.page.isVisible(`a:text("${project.name}")`)
    expect(projectIsVisible).toBe(true)
     console.log('Project\'s is created and project\'s page is opened')
    return
  }

  async numberOfProjectsIsVisible(number:number): Promise<void> {
    await this.page.waitForSelector(createProjectSelectors.container.project)
    const projectNumber = await this.page.locator(createProjectSelectors.container.project).count()
    expect(projectNumber).toBe(number)
    console.log(`There ${projectNumber} projects visible`)
  }


}