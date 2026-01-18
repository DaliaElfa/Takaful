import { expect, Page, test, Browser } from "@playwright/test";
import { PageManager } from "src/Page-Manager/PageManager.js";
import { JsonReader } from "../../../../../utils/JsonReader.js";
import { openBrowser } from "tests/Keywords.js";

//test.use({ storageState: "storageState.json" });
test.describe.serial("@TC03 @Regression Get Motor Policy", () => {
  let page: Page;
  let pm: PageManager;
  let browser: Browser;

  const users = JsonReader.getData<
    Array<{
      nationalID_IqamaID: string;
      mobileNumber: string;
      emailAddress: string;
      sequenceNumber: string;
    }>
  >("test-data/MotorData.json");
  const user = users[0];

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

  test("Fill Motor Insurance Form", async () => {
    await test.step("Fill policy holder details", async () => {
      await pm
        .InMotorInsurancePage()
        .fillingThePolicyHolderDetails(
          user.nationalID_IqamaID,
          user.mobileNumber,
          user.emailAddress,
          user.sequenceNumber,
        );
      await pm.InVerificationCodePage().waitForLoad(/revamp-individual-motor-quotation-otp/);
      await expect(pm.InVerificationCodePage().OTPContainer).toBeVisible();
    });
  });

  test("Fill OTP Code", async () => {
    await test.step("Fill first OTP container", async () => {
      await pm.InVerificationCodePage().fillTheFirstOTPContainer();
    });
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
