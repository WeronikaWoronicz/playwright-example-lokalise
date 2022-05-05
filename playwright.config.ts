import type { PlaywrightTestConfig } from "@playwright/test"
import { devices } from "@playwright/test"
import dotenv from 'dotenv';

const urlDict = {
  STAGING: 'https://app.stage.lokalise.cloud',
  PRODUCTION: 'https://app.lokalise.com'
}

dotenv.config();


const config: PlaywrightTestConfig = {
  testDir: "./e2e/tests",
  globalSetup: require.resolve('./global-setup'),
  use: {
    storageState: 'storageState.json',
    actionTimeout: 0,
    baseURL: urlDict[process.env.NODE_ENV],
    trace: "on-first-retry",
    screenshot: 'only-on-failure',
  },
  timeout: 50 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  outputDir: 'test-results/',
};

export default config;
