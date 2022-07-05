import type { Page, Response } from "@playwright/test"
const projectsSelectors = require("./ProjectsSelectors")

export class Projects {
 
	private page: Page

	constructor(page: Page) {
		this.page = page
	}

	navigate(urlPath: string): Promise<Response | null> {
		return this.page.goto(urlPath) 
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
				this.page.waitForNavigation({ url: new RegExp(`.*/projects`)})
			])
      
		}
		return
	}

}