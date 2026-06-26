import { test, expect, Page, BrowserContext } from "@playwright/test";
test.use({ baseURL: process.env.INKSPECTRA_BASE_URL });

test("micha test", async ({ page, baseURL }) => {
  console.log(`\nbaseURL content:<${baseURL}>\n`);
  console.log(`MICHA_ADMIN_EMAIL content:<${process.env.MICHA_ADMIN_EMAIL}>\n`);

  await page.goto("/es/login");

  await expect(
    page.getByRole("heading", { name: "Iniciar sesión" }),
  ).toBeVisible();

  await page
    .getByLabel("Email")
    .fill(process.env.MICHA_ADMIN_EMAIL || "empty variable");
  await page
    .getByLabel("Contraseña")
    .fill(process.env.MICHA_ADMIN_PASSWORD || "empty variable");
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL(/\/es\/dashboard/);
  await expect(
    page.getByRole("button", { name: "Analizar contrato" }),
  ).toBeVisible();
});
