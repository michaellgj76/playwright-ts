import { test, expect } from "@playwright/test";
import { Country } from "../types/restcountries-types";
import { CountrySchema } from "../types/restcountries-schemas";

test("get countries details", async ({ request }) => {
  const response = await request.get(
    "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags",
  );
  expect(response.ok()).toBeTruthy();
  const body: Country[] = await response.json();

  const result = CountrySchema.array().safeParse(body);
  if (!result.success) {
    // Print the specific mismatches
    console.error("Schema Mismatch Details:", result.error.flatten());
  }
  // Validate schema at runtime
  expect(
    result.success,
    `Expected valid Country objects, but got invalid data. See console for details.`,
  ).toBeTruthy();
  // Other validations and logs
  console.log("Number of countries:", body.length);
  console.log(
    "Example of countries:",
    body.filter((country) => country.name.common === "India"),
  );
  expect(body.length).toBeGreaterThan(180);
});
