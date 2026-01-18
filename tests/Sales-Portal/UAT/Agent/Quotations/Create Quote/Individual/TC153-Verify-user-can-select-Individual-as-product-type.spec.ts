import { Page, test, Browser, expect } from "@playwright/test";
import { PageManager2 } from "src/Page-Manager/PageManager2.js";
import { openBrowser } from "tests/Keywords.js";
import { JsonReader } from "utils/JsonReader.js";

//test.use({ storageState: "storageState.json" });
test.describe
  .serial("@TC153 @Regression Verify user can select 'Individual' as product type", () => {
  let page: Page;
  let pm: PageManager2;
  let browser: Browser;

  const users = JsonReader.getData<
    Array<{
      username: string;
      password: string;
    }>
  >("test-data/AgentUserUAT.json");
  const user = users[0];

  test.beforeAll(async () => {
    await test.step("Launch the URL", async () => {
      const result = await openBrowser("chromium", JsonReader.getEnv("uat").baseUrl);
      browser = result.browser;
      page = result.page;
      pm = PageManager2.getInstance(page);
      //await pm.ARTHomePage().openArtPage(JsonReader.getEnv("dev").baseUrl);
    });
  });
  test("Login Actions", async () => {
    await test.step("Click on Agent Login button", async () => {
      await pm.inOnboardingPage().clickOnAgentLoginButton();
    });

    await test.step("Enter username", async () => {
      await pm.inOnboardingPage().fillUserNameField(user.username);
    });

    await test.step("Enter password", async () => {
      await pm.inOnboardingPage().fillPasswordField(user.password);
    });

    await test.step("Click on Sign In button", async () => {
      await pm.inOnboardingPage().clickOnSignInButton();
    });
    /*
    await test.step("Filling the Verification Code", async () => {
      await pm.inOnboardingPage().fillingfirstOTPs("123456");
    });
    await test.step("Click on Verify OTP button", async () => {
      await pm.inOnboardingPage().clickOnVerifyOtpButton();
    });
    */
  });

  test("Verify the visibilty of the Create button", async () => {
    await test.step("Click on Quotations Button", async () => {
      await pm.inHomePage().clickOnQuotationsTextButton();
    });
    await test.step("Verify the visibilty of the creation button", async () => {
      await expect(pm.inHomePage().createButton).toBeVisible({ timeout: 10000 });
      await pm.inHomePage().clickOnCreatButton();
    });
  });
  test("Verify Selecting Individual", async () => {
    await test.step("Click on Individual", async () => {
      await expect(pm.inQuotationsPage().individualOption).toBeVisible({ timeout: 10000 });
      await pm.inQuotationsPage().clickOnIndividual();
    });
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
