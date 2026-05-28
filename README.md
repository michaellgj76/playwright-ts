# playwright-ts

# Playwright TypeScript Automation Project

[![Playwright Tests](https://github.com/michaellgj76/playwright-ts/actions/workflows/playwright.yml/badge.svg)](https://github.com/michaellgj76/playwright-ts/actions/workflows/playwright.yml)

## Inside that directory, you can run several commands:

`npx playwright test`
Runs the end-to-end tests.

`npx playwright test --ui`
Starts the interactive UI mode.

`npx playwright test --project=chromium`
Runs the tests only on Desktop Chrome.

`npx playwright test --debug`
Runs the tests in debug mode.

`npx playwright codegen`
Auto generate tests with Codegen.

### Playwright’s CLI is flexible with partial matches.

You can provide the exact full name of the spec file or the test title to reduce matches.

`npx playwright test example`
Runs the tests in specific files.

`npx playwright test example -g "credentials"`
Runs specific tests in specific files.
