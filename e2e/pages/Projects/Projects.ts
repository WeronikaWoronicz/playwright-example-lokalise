import type { Page, Response } from "@playwright/test"
import { project } from "../../fixtures/project"
const projectsSelectors = require("./ProjectsSelectors")

export class Projects {
 
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  navigate(): Promise<Response | null> {
    return this.page.goto("/projects") 
  }

  navigateFromProjectToProjects(): Promise<void> {
    return this.page.locator(projectsSelectors.link.projects).click()
}

  async removeAllProjects(): Promise<void> {
    while (await this.page.locator(projectsSelectors.button.more).isVisible()) {
        await this.page.click(projectsSelectors.button.more)
        await this.page
          .locator(projectsSelectors.menuitem.settings)
          .first()
          .click()
        const projectName = await this.page
          .locator(projectsSelectors.project.name)
          .inputValue()
        await this.page.locator(projectsSelectors.link.delete).click()
        await this.page.locator(projectsSelectors.input.projectName).fill(projectName)
        await Promise.all([
          this.page.locator(projectsSelectors.button.deleteProject).click(),
          this.page.waitForNavigation({ url: 'https://app.stage.lokalise.cloud/projects/' })
        ])
      
    }
    return
}

}