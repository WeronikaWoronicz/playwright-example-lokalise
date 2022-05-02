import type { Page, Response } from "@playwright/test"
import { project } from "../../fixtures/project"
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


}