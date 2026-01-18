import { chromium, firefox, webkit, Browser, Page } from "@playwright/test";

export async function openBrowser(
  browserName: string,
  url: string,
): Promise<{ browser: Browser; page: Page }> {
  let browser: Browser;

  switch (browserName.toLowerCase()) {
    case "chrome":
    case "chromium":
      browser = await chromium.launch({ headless: false });
      break;

    case "firefox":
      browser = await firefox.launch({ headless: false });
      break;

    case "safari":
    case "webkit":
      browser = await webkit.launch({ headless: false });
      break;

    case "edge":
      browser = await chromium.launch({
        headless: false,
        channel: "msedge",
      });
      break;

    default:
      throw new Error("Browser not supported");
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);

  return { browser, page };
}
