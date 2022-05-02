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
    return this.page.click('button:has-text("New project")')
  }

  clickProceedToCreateProjectBtn(): Promise<void> {
    return this.page.click('button:visible:has-text("Proceed")')
  }

  closeDialog(): Promise<void> {
    return this.page
      .click('[aria-label="Close dialog"]')
}

  confirmTargetOneLanguage(): Promise<void> {
    return this.page
      .press('#react-select-3-input',"Enter")
}

  fillProjectName(): Promise<void> {
    return this.page
      .fill('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]', project.name)
  }

  fillTargetOneLanguage(): Promise<void> {
    return this.page
      .fill('#react-select-3-input', "Spanish (es)")  
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
    await this.page.waitForSelector('[data-name="project-container"]')
    const projectNumber = await this.page.locator('[data-name="project-container"]').count()
    expect(projectNumber).toBe(number)
    console.log(`There ${projectNumber} projects visible`)
  }


}