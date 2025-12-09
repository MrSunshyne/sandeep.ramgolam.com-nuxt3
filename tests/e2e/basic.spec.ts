import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Sandeep/);
    await expect(page.locator('h2', { hasText: /^Projects$/ })).toBeVisible();

    // Check for new section heading
    await expect(page.locator('h2', { hasText: 'Featured Projects' })).toBeVisible();

    // Check for alternating layout grid
    await expect(page.locator('.group.grid')).not.toHaveCount(0);

    // Test wallpaper modal
    const viewButton = page.locator('text=View').first();
    await viewButton.click({ force: true });

    // Wait for modal to open and check for image
    // Wait for modal to open and check for image
    const image = page.locator('div[role="dialog"] img');
    await expect(image).toBeVisible({ timeout: 10000 });

    // Get initial image source
    const initialSrc = await image.getAttribute('src');

    // Click next button
    await page.locator('button:has(.i-solar-alt-arrow-right-linear), button:has(svg)').last().click();

    // Check if image changed (wait for attribute change)
    await expect(image).not.toHaveAttribute('src', initialSrc!);
});

test.describe('Navigation', () => {
    test('should navigate to blog page', async ({ page }) => {
        test.setTimeout(60000);
        await page.goto('/blog');
        await expect(page.locator('h1')).toContainText('Blog');
        // Check if there are blog posts
        await expect(page.locator('article, .blog-post, a[href^="/blog/"]')).not.toHaveCount(0);
    });

    test('should navigate to events page', async ({ page }) => {
        await page.goto('/events');
        await expect(page.locator('h1')).toContainText('Events');
        // Check if there are events
        await expect(page.locator('li, .event-item')).not.toHaveCount(0);
    });

    test('should navigate to about page', async ({ page }) => {
        await page.goto('/about');
        // Check for main name
        await expect(page.locator('text=Sandeep Ramgolam').first()).toBeVisible();
        // Check for key sections
        await expect(page.locator('h2', { hasText: 'My tech stack' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'Career' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'Education' })).toBeVisible();
    });

    test('should navigate to projects page', async ({ page }) => {
        await page.goto('/projects');
        await expect(page.locator('h1')).toContainText('Projects');
        // Check if there are project items
        await expect(page.locator('.project')).not.toHaveCount(0);
    });
});
