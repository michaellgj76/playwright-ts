import { test, expect } from "@playwright/test";

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

test("Verify Playwright navigation.", async ({ page }) => {
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
