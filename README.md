# playwright-ts

Playwright examples using TypeScript.

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

## Playwright’s CLI is flexible with partial matches.

Note: You can provide the exact full name for either the spec file or the test title if needed.

`npx playwright test example`
Runs the tests in a specific file.

`npx playwright test example -g "credentials"`
Runs a specific tests in a specific file.
