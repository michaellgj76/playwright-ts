import { test, expect } from "@playwright/test";

test("get countries details", async ({ request }) => {
  const response = await request.get(
    "https://restcountries.com/v3.1/all?fields=name,capital,currencies",
  );
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  console.log("Number of countries:", body.length);
  expect(body.length).toBeGreaterThan(180);
});
