import { test } from "@playwright/test";

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(``);
  });

  // I need to update this after i implemented the global login feature in the framework...
  // test("Provide wrong email", async ({ page }) => {
  //   await userLogin(page, "userWithoutAccount");
  //   // await expect(validationError).toHaveText('Invalid username or password.');
  // });
});
