import type { Page, Response } from "@playwright/test"
import { expect } from "@playwright/test"
import { ProjectData } from "../../fixtures/ProjectData"
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

  clickProceedBtn(): Promise<void> {
    return this.page.click(createProjectSelectors.buttons.proceed)
  }

  confirmTargetLanguage(): Promise<void> {
    return this.page
      .press(createProjectSelectors.input.targetLanguage,createProjectSelectors.key.enter)
}

  fillProjectName(name: string): Promise<void> {
    return this.page
      .fill(createProjectSelectors.input.projectName, name)
  }

  fillTargetLanguage(language: string): Promise<void> {
    return this.page
      .fill(createProjectSelectors.input.targetLanguage, language)  
  }

  async createProject(project: ProjectData): Promise<void> {
      await this.fillProjectName(project.name)
      await this.fillTargetLanguage(project.language)
      await this.confirmTargetLanguage()
      await this.clickProceedBtn()
      return
  }

//Assertions

  async expectProjectToBeVisible(name: string): Promise<void> {
    await this.page.waitForNavigation()
    const projectIsVisible = await this.page.isVisible(createProjectSelectors.getProjectLink(name))
    expect(projectIsVisible).toBe(true)
     console.log('Project\'s is created and project\'s page is opened')
    return
  }

  async expectNumberOfProjectsVisibleToBe(count:number): Promise<void> {
    await this.page.waitForSelector(createProjectSelectors.container.project)
    const projectNumber = await this.page.locator(createProjectSelectors.container.project).count()
    expect(projectNumber).toBe(count)
    console.log(`Number of projects visible: ${projectNumber}`)
  }


}