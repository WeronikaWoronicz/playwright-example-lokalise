import type { Page, Response } from "@playwright/test"
import { project } from "../../fixtures/project"

export class Login {
 
  private page: Page


/** properties */
//url = config.HOST + "/sign-up";

  constructor(page: Page) {
    this.page = page
  }

  clickCreateFirstProjectBtn(): Promise<void> {
    return this.page.click(this.buttonGetStarted)
  }

 async typeProjectName(): Promise<void> {
    return this.page
      .fill('[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]', project.name)
  }


  navigate(): Promise<Response | null> {
    return this.page.goto("https://app.stage.lokalise.cloud/projects") 
  }

  navigateFromProjectToProjects(): Promise<void> {
    return this.page.locator('a:text("Projects")').click()
}

  async removeAllProjects(): Promise<void> {
    while (
        await this.page.locator('[aria-label="More\\.\\.\\."] >> nth=0').isVisible()
      ) {
        await this.page.click('[aria-label="More\\.\\.\\."] >> nth=0')
        await this.page
          .locator('[role=menuitem][aria-label="Settings"]')
          .first()
          .click()
        const projectName = await this.page
          .locator('[placeholder="Project name"]')
          .inputValue()
        await this.page.locator("text=Delete project").click()
        await this.page.locator(".bootbox-input").fill(projectName)
        await this.page.locator('button:has-text("Delete project")').click()
        await this.page.waitForNavigation({ url: 'https://app.stage.lokalise.cloud/projects/' })
  }
        return
}

}