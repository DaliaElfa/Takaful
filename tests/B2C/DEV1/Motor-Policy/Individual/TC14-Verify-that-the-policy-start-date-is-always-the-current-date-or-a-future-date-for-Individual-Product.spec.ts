import { Page, test, Browser, expect } from "@playwright/test";
import { PageManager } from "src/Page-Manager/PageManager.js";
import { openBrowser } from "tests/Keywords.js";
import { JsonReader } from "utils/JsonReader.js";

test.describe
  .serial("@TC14 @Regression policy start date cannot be set to a past date and must be either the present date or a future date.", () => {
  let page: Page;
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

  test("Navigate to Motor Insurance Page", async () => {
    await test.step("Click Allow Button", async () => {
      await pm.ARTHomePage().clickOnAllowButtonForAccess();
    });

    await test.step("Hover on Our Products", async () => {
      await pm.ARTHomePage().moveTheCursorToOurProductsButton();
    });

    await test.step("Click on Motor Insurance", async () => {
      await pm.ARTHomePage().clickOnMotorInsuranceButtonFromTheProductList();
    });

    await test.step("Click on Get Your Policy Now", async () => {
      await pm.InMotorInsurancePage().clickOnGetYourPolicyNowAfterClickingOnMotorInsuranceOption();
    });
  });
  test("Verify Policy Start Date does not allow past dates", async () => {
    await test.step("Validate Policy Start Date validation on Individual Get Your Policy form", async () => {
      await expect(pm.InMotorInsurancePage().policyStartDate).toBeVisible({ timeout: 1000 });
      const errorMsg = await pm.InMotorInsurancePage().getErrorMessageForThePolicyStartDate();
      expect(errorMsg).toContain("Date must be after");
    });
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
