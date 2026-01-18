import { Page, test, Browser, expect } from "@playwright/test";
import { PageManager2 } from "src/Page-Manager/PageManager2.js";
import { openBrowser } from "tests/Keywords.js";
import { JsonReader } from "utils/JsonReader.js";

test.describe
  .serial("@TC155 @Regression Verify correct plan types are displayed for Individual product", () => {
  let page: Page;
  let pm: PageManager2;
  let browser: Browser;

  const users = JsonReader.getData<Array<{ username: string; password: string }>>(
    "test-data/AgentUserUAT.json",
  );
  const user = users[0];

  const customerinfo = JsonReader.getData<
    Array<{
      nationalID_IqamaID: string;
      mobileNumber: string;
      emailAddress: string;
      customerYOB: string;
      customerMOB: string;
      sequenceNumber: string;
    }>
  >("test-data/MotorData.json");
  const customer_user = customerinfo[1];

  test.beforeAll(async () => {
    await test.step("Launch the URL", async () => {
      const result = await openBrowser("chromium", JsonReader.getEnv("uat").baseUrl);
      browser = result.browser;
      page = result.page;
      pm = PageManager2.getInstance(page);
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

    await test.step("Fill the Verification Code", async () => {
      await pm.inOnboardingPage().fillingfirstOTPs("123456");
    });

    await test.step("Click on Verify OTP button", async () => {
      await pm.inOnboardingPage().clickOnVerifyOtpButton();
    });

    await test.step("Wait until Dashboard loads", async () => {
      await expect(page).toHaveURL(/\/web\/home\/dashboard/);
    });
  });

  test("Verify visibility of Create button", async () => {
    await test.step("Click on Quotations Button", async () => {
      await pm.inHomePage().clickOnQuotationsTextButton();
    });

    await test.step("Verify the visibility of the Create button", async () => {
      await expect(pm.inHomePage().createButton).toBeVisible({
        timeout: 10000,
      });
      await pm.inHomePage().clickOnCreatButton();
    });
  });

  test("Verify Selecting Individual", async () => {
    await test.step("Click on Individual option", async () => {
      await expect(pm.inQuotationsPage().individualOption).toBeVisible({
        timeout: 10000,
      });
      await pm.inQuotationsPage().clickOnIndividual();
    });

    await test.step("Select Motor class of business & fill customer info", async () => {
      await expect(pm.inQuotationsPage().motorBusinessOption).toBeVisible({
        timeout: 10000,
      });
      await pm.inQuotationsPage().clickOnClassOfBusinessMotorType();
      await pm.inQuotationsPage().waitForLoad(/web\/home\/quotes/);
      await pm
        .inQuotationsPage()
        .fillCustomerInformation(
          customer_user.nationalID_IqamaID,
          customer_user.emailAddress,
          customer_user.mobileNumber,
          customer_user.customerYOB,
          customer_user.customerMOB,
        );

      await pm.inQuotationsPage().fillPolicyStartDate();
      await pm.inQuotationsPage().clickOnNextButton();
    });

    await test.step("Adding vehicle section", async () => {
      await pm.inQuotationsPage().clickOnAddVehicleButton();
      await pm.inQuotationsPage().fillTheSequenceNumber(customer_user.sequenceNumber);
      await pm.inQuotationsPage().clickOnAddVehicleInformationButton();
      await pm.inQuotationsPage().clickOnNextButton();
    });

    await test.step("Select Plans", async () => {
      await pm.inQuotationsPage().clickOnInfoPlans();
      await pm.inQuotationsPage().checkThePlansCoverage();
      await pm.inQuotationsPage().clickOnContinueButton();
      await pm.inQuotationsPage().clickOnNextButton();
    });

    await test.step("Select Add Ons", async () => {
      await pm.inQuotationsPage().clickOnNextButton();
    });

    await test.step("Add driver", async () => {
      await pm.inQuotationsPage().clickOnNextButton();
    });

    await test.step("Add Additional Details", async () => {
      await pm.inQuotationsPage().clickOnProceedButton();
    });
    await test.step("Summary Actions", async () => {
      await pm.inQuotationsPage().clickOnSummaryCheckBox();
      await pm.inQuotationsPage().clickOnGenerateQuoteButton();
    });
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
