import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://github.com/login");
  await page
    .getByLabel("Username or email address")
    .fill(process.env.USER_NAME ?? "");
  await page.getByLabel("Password").fill(process.env.PASSWORD ?? "");
  await page.getByRole("button", { name: "Sign in" }).click();
  if (
    await page
      .getByRole("heading", { name: "Configure passwordless" })
      .isVisible()
  ) {
    await page.getByRole("button", { name: "Ask me later" }).click();
  }
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL("https://github.com/");
  await page.getByLabel("Open user account menu").click();
  await page.getByRole("link", { name: "Your profile" }).click();
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(
    page.getByRole("button", { name: "@Fionn-MacAnBhaird Fionn-" })
  ).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
