import { Page, test, Browser } from "@playwright/test";
import { PageManager } from "src/Page-Manager/PageManager.js";
import { openBrowser } from "tests/Keywords.js";
import { JsonReader } from "utils/JsonReader.js";

test.describe.serial("@TC04 @Regression Get Motor Policy For Business", () => {
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

    await test.step("Click on Business Option", async () => {
      await pm.ARTHomePage().clickOnTheBusinessOptionFromTheTop();
    });

    await test.step("Click on Motor Insurance", async () => {
      await pm.ARTHomePage().clickOnMotorOptionForTheBusiness();
    });

    await test.step("Click on Get Your Policy Now", async () => {
      await pm.InMotorInsurancePage().clickOnGetYourPolicyNowAfterClickingOnMotorInsuranceOption();
      await pm.InBusinessMotorInsurancePage().fillingMotorInsuranceFormForBusiness();
    });
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
