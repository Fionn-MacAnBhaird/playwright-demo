import { test, expect } from "@playwright/test";

test("Interview project is public", async ({ page, isMobile }) => {
  await page.goto("https://github.com/");
  await page.getByLabel("Open user account menu").click();

  await page.getByRole("link", { name: "Your profile" }).click();
  await page.getByRole("link", { name: "todo-interview" }).click();

  isMobile
    ? await expect(
        page
          .locator("#repository-container-header")
          .getByText("Public repository")
      ).toBeVisible()
    : await expect(
        page
          .locator("#repository-container-header")
          .getByText("Public", { exact: true })
      ).toBeVisible();

  await expect(page.getByText("Good luck!")).toBeVisible();
});

test("Set and clear presenting status", async ({ page }) => {
  // Navigate
  await page.goto("https://github.com/");
  await page.getByLabel("Open user account menu").click();

  // Open form
  await page.getByRole("button", { name: "Set status" }).click();

  // Fill in form
  await page.getByPlaceholder("What's happening?").click();
  await page.getByRole("button", { name: "Focusing" }).click();

  await page.getByPlaceholder("What's happening?").fill("Presenting");
  await page.getByLabel("Busy").check();

  await page.getByLabel("Visible to").selectOption("65290341");

  await page
    .getByLabel("Edit status")
    .getByRole("button", { name: "Set status" })
    .click();

  // Clear status
  await page.getByRole("button", { name: "🎯 Presenting" }).click();
  await page.getByRole("button", { name: "Clear status" }).click();

  // Expect status to be cleared
  await expect(page.getByRole("button", { name: "Set status" })).toBeVisible();
});
