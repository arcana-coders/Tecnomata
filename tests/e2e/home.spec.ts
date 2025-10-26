import { test, expect, ConsoleMessage, Response } from '@playwright/test';

// Basic smoke covering the previous production issues:
// - Content must be visible without depending on external JS
// - The inline runtime should run (pre-js-style removed)
// - No 404 errors in console (especially animations.js)

test.describe('Home page smoke', () => {
  test('renders hero and primary CTA visibly', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('response', (resp: Response) => {
      try {
        const status = resp.status();
        const url = resp.url();
        if (status >= 400) failedRequests.push(`${status} ${url}`);
      } catch {}
    });

    await page.goto('/');

    // h1 content exists and is visible
  const heroHeading = page.getByRole('heading', { name: /Hacemos/i }).first();
  await expect(heroHeading).toBeVisible();

    // A scroll-animate element should be visible in the viewport
  const anim = page.locator('.scroll-animate').first();
    await expect(anim).toBeVisible();

    // The pre-JS visibility override style should be removed by the runtime
    await expect.poll(async () => {
      return await page.evaluate(() => !!document.getElementById('pre-js-style'));
    }, { message: 'pre-js-style should be removed by runtime' }).toBeFalsy();

    // There should be no obvious 404/5xx network or console errors
    const errorText = consoleErrors.join('\n');
    expect(failedRequests.join('\n')).not.toMatch(/\b(404|5\d{2})\b/);
    expect(errorText).not.toMatch(/404/i);
    expect(errorText).not.toMatch(/animations\.js/i);
  });
});
