/// <reference types="node" />
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";

const environment = process.env.ENV || "local";
dotenv.config({ path: path.resolve(__dirname, `.env.${environment}`) });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: "never" }],
    ["json", { outputFile: "test-results/results.json" }],
    ["list"],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    baseURL: "https://demo.playwright.dev/todomvc",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "api-check",
      testMatch: "**/api/**",
    },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "**/ui/**/*.spec.ts",
      testIgnore: "**/api/**",
      dependencies: ["api-check"],
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testMatch: "**/ui/**/*.spec.ts",
      testIgnore: "**/api/**",
      dependencies: ["api-check"],
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 7"] },
      testIgnore: "**/api/**",
      dependencies: ["api-check"],
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 14"] },
      // If NOT in CI, ignore all files. If in CI, ignore nothing.
      testIgnore: !process.env.CI ? "**/*" : "**/api/**",
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
