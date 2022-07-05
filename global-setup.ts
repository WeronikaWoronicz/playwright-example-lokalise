import { chromium, FullConfig  } from "@playwright/test"
import actualConfig from  "./playwright.config"

async function globalSetup(config: FullConfig) {
	const browser = await chromium.launch()
	const page = await browser.newPage({baseURL: actualConfig.use.baseURL})
	await page.goto("/")
	await page
		.fill("[placeholder=\"user\\@company\\.com\"]", process.env.EMAIL)
	await page.click("[placeholder=\"password\"]")
	await page.fill("[placeholder=\"password\"]", process.env.PASSWORD)
	await Promise.all([
		page.waitForNavigation(),
		page.click("button:has-text(\"Log in\")"),
	])
	// Save signed-in state to 'storageState.json'.
	await page.context().storageState({ path: "storageState.json" })
	await browser.close()
}

export default globalSetup