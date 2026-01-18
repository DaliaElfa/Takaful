import { Browser, expect, test } from "@playwright/test";
import { PageManager } from "src/Page-Manager/PageManager.js";
import { openBrowser } from "tests/Keywords.js";
import { JsonReader } from "utils/JsonReader.js";

test.use({ storageState: "storageState.json" });

test.describe.serial("@TC02 @Regression", () => {
  let page;
  let pm: PageManager;
  let browser: Browser;

  test.beforeAll(async () => {
    await test.step("Launch the URL", async () => {
      const result = await openBrowser("chromium", JsonReader.getEnv("dev").baseUrl);
      browser = result.browser;
      page = result.page;
      pm = PageManager.getInstance(page);
      //await pm.ARTHomePage().openArtPage(JsonReader.getEnv("dev").baseUrl);
    });
  });
  test("Verify if the user can hover on Our-Products tab", async () => {
    await test.step("Go to 'Our Products'", async () => {
      await pm.ARTHomePage().clickOnAllowButtonForAccess();
      await pm.ARTHomePage().moveTheCursorToOurProductsButton();
      await expect(pm.ARTHomePage().individualLabel).toBeVisible();
      await pm.ARTHomePage().clickOnTheBIndividualOptionFromTheTop();
    });
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
