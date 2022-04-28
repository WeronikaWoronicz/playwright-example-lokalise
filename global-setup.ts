import { chromium, FullConfig } from '@playwright/test'
import { login } from "./e2e/fixtures/login"

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch()
  const page = await browser.newPage();
  await page.goto("https://app.stage.lokalise.cloud")
  await page
    .locator('[placeholder="user\\@company\\.com"]')
    .fill(login.email)
  await page.locator('[placeholder="password"]').click()
  await page.locator('[placeholder="password"]').fill(login.password)
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.stage.lokalise.cloud/projects' }*/),
    page.locator('button:has-text("Log in")').click(),
  ])
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;