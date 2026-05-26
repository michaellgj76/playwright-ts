import { test, expect } from "@playwright/test";

test.describe("Playwright Homepage UI Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto("https://playwright.dev/");
  });

  test("ai-1. Verify page title and main heading are visible", async ({
    page,
  }) => {
    // Verify the browser tab title
    await expect(page).toHaveTitle(
      /Fast and reliable end-to-end testing for modern web apps/,
    );

    // Verify the main H1 attraction text is visible
    const mainHeading = page.getByRole("heading", {
      name: "Playwright enables reliable web automation for testing, scripting, and AI agents.",
    });
    await expect(mainHeading).toBeVisible();
  });

  test('ai-2. Navigate to "Get Started" documentation', async ({ page }) => {
    // Click the "Get started" landing button
    await page.getByRole("link", { name: "Get started" }).click();

    // Verify the URL changes to the introduction page
    await expect(page).toHaveURL(/.*intro/);

    // Verify the main documentation header is displayed
    const docHeader = page.getByRole("heading", {
      name: "Installation",
      exact: true,
    });
    await expect(docHeader).toBeVisible();
  });

  test("ai-3. Toggle between Dark and Light mode", async ({
    page,
  }, testInfo) => {
    // Skip if the project name is 'Mobile'
    test.skip(
      testInfo.project.name === "Mobile Chrome" ||
        testInfo.project.name === "Mobile Safari",
      "Not supported in Mobile",
    );

    // Locate the theme toggle button in the navigation bar
    const themeToggle = page.getByRole("button", {
      name: "Switch between dark and light mode",
    });

    // Check initial state (the site defaults to dark mode based on configuration/system)
    const htmlElement = page.locator("html");

    // Click the toggle to switch themes
    await themeToggle.click();

    // Verify the theme attribute changes accordingly
    // Note: Docusaurus uses 'data-theme' attribute on the html tag
    await expect(htmlElement).toHaveAttribute("data-theme", /(light|dark)/);
  });

  test("ai-4. Search for a topic using the documentation search bar", async ({
    page,
  }) => {
    // Click the search button (triggers Algolia DocSearch modal)
    await page.getByRole("button", { name: "Search" }).click();

    // Type a query into the search input field
    const searchInput = page.getByPlaceholder("Search docs");
    await searchInput.fill("Trace Viewer");

    // Wait for search results to populate and select the first relevant result
    const firstResult = page.locator(".DocSearch-Hit-Container").first();
    await expect(firstResult).toBeVisible();
    await firstResult.click();

    // Verify navigating to the Trace Viewer documentation page
    await expect(page).toHaveURL(/.*trace-viewer/);
    const traceHeader = page.getByRole("heading", {
      name: "Trace viewer",
      level: 1,
      exact: true,
    });
    await expect(traceHeader).toBeVisible();
  });

  test("ai-5. Verify core technology badges/links are functional", async ({
    page,
  }) => {
    // Locate the "Playwright MCP" section heading
    const mcpHeading = page.getByRole("heading", { name: "Playwright MCP" });
    await expect(mcpHeading).toBeVisible();

    // Verify the specific terminal code block text exists on the page
    const mcpCommand = page
      .locator("code")
      .filter({ hasText: "npx @playwright/mcp@latest" });
    await expect(mcpCommand).toBeVisible();
  });
});
