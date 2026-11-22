import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Sandeep/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Projects", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".feed-item")).not.toHaveCount(0);

  // Wallpaper lightbox opens and steps to the next wallpaper. Clicks that land
  // before hydration do nothing, so retry until the dialog shows.
  const viewButton = page
    .locator(".wallpaper-card")
    .first()
    .getByRole("button", { name: "View" });
  const image = page.locator("dialog.wallpaper-dialog img");
  await expect(async () => {
    await viewButton.click({ force: true });
    await expect(image).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 30000 });
  const initialSrc = await image.getAttribute("src");

  await page.getByRole("button", { name: "Next wallpaper" }).click();
  await expect(image).not.toHaveAttribute("src", initialSrc!);
});

test.describe("Navigation", () => {
  test("should navigate to blog page", async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("/blog");
    await expect(page.locator("h1")).toContainText("Blog");
    // Check if there are blog posts
    await expect(
      page.locator('article, .blog-post, a[href^="/blog/"]'),
    ).not.toHaveCount(0);
  });

  test("should navigate to events page", async ({ page }) => {
    await page.goto("/events");
    await expect(page.locator("h1")).toContainText("Events");
    // Check if there are events
    await expect(page.locator("li, .event-item")).not.toHaveCount(0);
  });

  test("should navigate to about page", async ({ page }) => {
    await page.goto("/about");
    // Check for main name
    await expect(page.locator("text=Sandeep Ramgolam").first()).toBeVisible();
    // Check for key sections
    await expect(
      page.locator("h2", { hasText: "My tech stack" }),
    ).toBeVisible();
    await expect(page.locator("h2", { hasText: "Career" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "Education" })).toBeVisible();
  });

  test("projects open as the timeline filtered to projects", async ({
    page,
  }) => {
    // a direct load: the static page is unfiltered until the client applies
    // ?type=, so wait for that rather than reading the first paint
    await page.goto("/timeline/?type=project");
    await expect(page.locator("h1")).toContainText("Timeline");
    await expect(
      page.locator(".timeline-row:not([data-kind=project])"),
    ).toHaveCount(0, { timeout: 30000 });
    await expect(
      page.locator(".timeline-row[data-kind=project]"),
    ).not.toHaveCount(0);
  });

  test("timeline mixes content kinds and filters by kind", async ({ page }) => {
    await page.goto("/timeline");
    await expect(page.locator("h1")).toContainText("Timeline");
    await expect(page.locator(".timeline-row[data-kind=post]")).not.toHaveCount(
      0,
    );
    await expect(
      page.locator(".timeline-row[data-kind=event]"),
    ).not.toHaveCount(0);

    // clicks before hydration do nothing, so retry until the filter applies
    await expect(async () => {
      await page.getByRole("button", { name: /^Projects/ }).click();
      await expect(page).toHaveURL(/type=project/, { timeout: 1000 });
    }).toPass({ timeout: 30000 });
    await expect(page.locator(".timeline-row")).not.toHaveCount(0);
    await expect(
      page.locator(".timeline-row:not([data-kind=project])"),
    ).toHaveCount(0);
  });
});
