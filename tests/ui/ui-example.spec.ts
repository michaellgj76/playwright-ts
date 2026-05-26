import { test, expect, Page, BrowserContext } from "@playwright/test";
import def from "ajv/dist/vocabularies/discriminator";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});

test("Verify Playwright search.", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page.locator("h1")).toContainText(
    "Playwright enables reliable web automation for testing, scripting, and AI agents.",
  );
  await expect(
    page.getByRole("heading", { name: "Playwright enables reliable" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Get started" }).click();
  // Searching for Parameterized Tests using the search button
  await expect(page.locator('button[aria-label*="Search"]')).toBeVisible();
  // await page.locator('button[aria-label*="Search"]').click();
  await page.getByRole("button", { name: "Search", exact: false }).click();
  await page.getByRole("searchbox", { name: "Search" }).fill("parameter");
  await page.getByRole("link", { name: "Parameterized Tests" }).click();
  await expect(
    page.getByRole("heading", { name: "Parameterize tests" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Passing Environment" }),
  ).toBeVisible();
});

test("Verify Playwright navigation.", async ({ page }, testInfo) => {
  // Skip if the project name is 'Mobile Chrome'
  test.skip(
    testInfo.project.name === "Mobile Chrome" ||
      testInfo.project.name === "Mobile Safari",
    "Not supported in Mobile Chrome",
  );
  await page.goto("https://playwright.dev/");
  await expect(page.locator("h1")).toContainText(
    "Playwright enables reliable web automation for testing, scripting, and AI agents.",
  );
  await expect(
    page.getByRole("heading", { name: "Playwright enables reliable" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
  // Checking if Annotations link is visible and clicking on it
  await expect(page.getByRole("link", { name: "Annotations" })).toBeVisible();
  await page.getByRole("link", { name: "Annotations" }).click();
  // Collapsing the Playwright Test section
  await page.getByRole("button", { name: "Playwright Test" }).click();
  // Checking that Annotaitions is not visible
  await expect(
    page.getByRole("link", { name: "Annotations", exact: true }),
  ).not.toBeVisible();
  // Collapsing the Guides section
  await page.getByRole("button", { name: "Guides" }).click();
  // Checking that Accessibility testing is not visible
  await expect(
    page.getByRole("link", { name: "Accessibility testing" }),
  ).not.toBeVisible();
  // Back to homepage
  await page.getByRole("link", { name: "Playwright logo Playwright" }).click();
  await expect(page.getByRole("link", { name: "Get started" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Playwright enables reliable" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Get started" }).click();
});

test.describe("Verify switching between dark and light themes on Playwright homepage", () => {
  let context: BrowserContext;
  let page: Page;
  test.beforeAll(({}, testInfo) => {
    // Skip if the project name is 'Mobile Chrome' or 'Mobile Safari'
    test.skip(
      testInfo.project.name === "Mobile Chrome" ||
        testInfo.project.name === "Mobile Safari",
      'Skipping tests on "Mobile Chrome"',
    );
  });

  test.beforeEach(async ({ browser }) => {
    // important to set the system theme to light before running the test, otherwise the test may fail
    context = await browser.newContext({ colorScheme: "light" });
    page = await context.newPage();
  });

  test.afterEach(async () => {
    if (context) {
      await context.close();
    }
  });

  test("Verify switching between dark and light", async () => {
    await page.goto("https://playwright.dev/");
    // Another method to ensure the theme is Emulate light theme
    // await page.emulateMedia({ colorScheme: "light" });
    await expect(
      page.getByRole("button", { name: "Switch between dark and light" }),
      "Expected button to have a hint attribute, but it was not found.",
    ).toHaveAttribute("title", "system mode");
    // another way to check the hint attribute
    await expect(
      await page
        .getByRole("button", { name: "Switch between dark and light" })
        .getAttribute("title"),
      "Expected button to have a hint attribute, but it was not found.",
    ).toContain("system");

    // checking the initial theme (system) by checking the background color
    const defaultBackgroundColor = "rgba(0, 0, 0, 0)"; // light theme
    let expectedCodeBackgroundColor = "rgb(246, 247, 248)"; // light theme
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      defaultBackgroundColor,
    );
    await expect(page.getByRole("navigation", { name: "Main" })).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
    await expect(page.getByText("npm i -g @playwright/cli@")).toHaveCSS(
      "background-color",
      expectedCodeBackgroundColor,
    );
    await expect(
      page.locator("section").filter({ hasText: "Powerful toolingTest" }),
    ).toHaveCSS("background-color", "rgb(245, 246, 247)");

    // Switching to the next theme (light)
    expectedCodeBackgroundColor = "rgb(246, 247, 248)"; // light theme
    await page
      .getByRole("button", { name: "Switch between dark and light" })
      .click();
    await expect(
      page.getByRole("button", { name: "Switch between dark and light" }),
      "Expected button to have a hint attribute, but it was not found.",
    ).toHaveAttribute("title", "light mode");
    // checking if the theme has changed by checking the background color
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      defaultBackgroundColor,
    );
    await expect(page.getByRole("navigation", { name: "Main" })).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
    await expect(page.getByText("npm i -g @playwright/cli@")).toHaveCSS(
      "background-color",
      expectedCodeBackgroundColor,
    );
    await expect(
      page.locator("section").filter({ hasText: "Powerful toolingTest" }),
    ).toHaveCSS("background-color", "rgb(245, 246, 247)");

    // Switching to the next theme (dark)
    expectedCodeBackgroundColor = "rgba(255, 255, 255, 0.1)"; // dark theme
    await page
      .getByRole("button", { name: "Switch between dark and light" })
      .click();
    await expect(
      page.getByRole("button", { name: "Switch between dark and light" }),
      "Expected button to have a hint attribute, but it was not found.",
    ).toHaveAttribute("title", "dark mode");
    // checking if the theme has changed by checking the background color
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      defaultBackgroundColor,
    );
    await expect(page.getByRole("navigation", { name: "Main" })).toHaveCSS(
      "background-color",
      "rgb(36, 37, 38)",
    );
    await expect(page.getByText("npm i -g @playwright/cli@")).toHaveCSS(
      "background-color",
      expectedCodeBackgroundColor,
    );
    await expect(
      page.locator("section").filter({ hasText: "Powerful toolingTest" }),
    ).toHaveCSS("background-color", "rgba(255, 255, 255, 0.03)");

    // Switching to the next theme (system)
    expectedCodeBackgroundColor = "rgb(246, 247, 248)"; // light theme
    await page
      .getByRole("button", { name: "Switch between dark and light" })
      .click();
    await expect(
      page.getByRole("button", { name: "Switch between dark and light" }),
      "Expected button to have a hint attribute, but it was not found.",
    ).toHaveAttribute("title", "system mode");
    // checking if the theme has changed by checking the background color of the body
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      defaultBackgroundColor,
    );
    await expect(page.getByRole("navigation", { name: "Main" })).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
    await expect(page.getByText("npm i -g @playwright/cli@")).toHaveCSS(
      "background-color",
      expectedCodeBackgroundColor,
    );
    await expect(
      page.locator("section").filter({ hasText: "Powerful toolingTest" }),
    ).toHaveCSS("background-color", "rgb(245, 246, 247)");

    // Closing the context to reset the theme for other tests
    await context.close();
  });
});
