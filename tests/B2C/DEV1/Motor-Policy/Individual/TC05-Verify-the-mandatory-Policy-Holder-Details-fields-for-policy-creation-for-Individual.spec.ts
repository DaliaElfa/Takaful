import { Page, test, Browser, expect } from "@playwright/test";
import { PageManager } from "src/Page-Manager/PageManager.js";
import { openBrowser } from "tests/Keywords.js";
import { JsonReader } from "utils/JsonReader.js";

test.describe
  .serial("@TC05 @Regression Verify the mandatory Policy Holder details for individual", () => {
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
  test("Verify the mandatory fields if exists", async () => {
    await test.step("Check Get Yout Policy Form - Individual All Elements", async () => {
      await expect(pm.InMotorInsurancePage().nationalID_IqamaIDField).toBeVisible();
      await expect(pm.InMotorInsurancePage().dateOfBirthField).toBeVisible();
      await expect(pm.InMotorInsurancePage().mobileNumberField).toBeVisible();
      await expect(pm.InMotorInsurancePage().emailAddressField).toBeVisible();
      await expect(pm.InMotorInsurancePage().sequenceNumberSection).toBeVisible();
      await expect(pm.InMotorInsurancePage().ownerShipTransfer).toBeVisible();
      await expect(pm.InMotorInsurancePage().customNumberSection).toBeVisible();

      await expect(pm.InMotorInsurancePage().policyStartDate).toBeVisible();
      await expect(pm.InMotorInsurancePage().checkBoxForAgreement).toBeVisible();
    });
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
