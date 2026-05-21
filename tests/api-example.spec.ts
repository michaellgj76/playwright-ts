import { test, expect } from "@playwright/test";
import { Country } from "../types/restcountries-types";
import { CountriesResponse } from "../schemas/restcountries-schemas";
import Ajv from "ajv";
import schema from "../schemas/restcountries-schemas.json";

test("ZOD: get countries details and validate the response schema at runtime", async ({
  request,
}) => {
  const response = await request.get(
    "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags",
  );
  expect(response.ok()).toBeTruthy();
  const body: Country[] = await response.json();

  const result = CountriesResponse.safeParse(body);
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
  // console.log(
  //   "Example of countries:",
  //   body.filter((country) => country.name.common === "India"),
  // );
  expect(body.length).toBeGreaterThan(180);
});

test("AJV: get countries details and validate the response schema at runtime", async ({
  request,
}) => {
  const response = await request.get(
    "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags",
  );
  expect(response.ok()).toBeTruthy();
  const body: Country[] = await response.json();

  const ajv = new Ajv({ allErrors: true }); // 'allErrors' prints everything wrong at once

  const validate = ajv.compile(schema);
  const valid = validate(body);
  if (!valid) {
    // Print the specific mismatches
    console.error("Schema Mismatch Details:", validate.errors);
  }
  // Validate schema at runtime
  expect(
    valid,
    `Expected valid Country objects, but got invalid data. See console for details.`,
  ).toBeTruthy();
  // Other validations and logs
  console.log("Number of countries:", body.length);
  // console.log(
  //   "Example of countries:",
  //   body.filter((country) => country.name.common === "India"),
  // );
  expect(body.length).toBeGreaterThan(180);
});
