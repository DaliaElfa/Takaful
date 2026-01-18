import { APIRequestContext, Locator, Page } from "@playwright/test";
import { PageBase } from "../../../Base-Methods/PageBase.js";
export class home_Page extends PageBase {
  [x: string]: any;
  public readonly urlStageLink: string;
  public readonly allowPermissionButton: Locator;
  public readonly ourProducts: Locator;
  public readonly businessLabel: Locator;
  public readonly individualLabel: Locator;
  public readonly individualOption: Locator;
  public readonly businessOptionOnTheTop: Locator;
  public readonly motorOptionForBusiness: Locator;
  public readonly motorInsurance: Locator;

  constructor(page: Page) {
    super(page);
    this.urlStageLink = process.env.Stage!;
    this.allowPermissionButton = this.page.getByText("Allow", { exact: true });
    this.ourProducts = this.page.locator("#megaMenuButton");
    this.motorInsurance = this.page.locator("//a[text()=' Motor Insurance ']");
    this.businessLabel = this.page.locator("//p[text()=' Business ']");
    this.businessOptionOnTheTop = this.page.locator("(//a[text()='Business'])[1]");
    this.individualOption = this.page.locator("(//a[text()='Individual'])[1]");
    this.individualLabel = this.page.locator("//p[text()=' Individual ']");
    this.motorOptionForBusiness = this.page.locator(
      "(//section[@class='additional-driver-info-icon'])[2]",
    );
  }

  async openArtPage(url: string) {
    await this.clearAllCookies();
    await this.navigateToPage(url);
    //await this.waitUntilVisibilityOfElement(this.allowPermissionButton);
  }

  async clickOnAllowButtonForAccess() {
    await this.clickButton(this.allowPermissionButton);
  }
  async moveTheCursorToOurProductsButton() {
    await this.moveToElement(this.ourProducts);
    await this.page.locator("body").hover();
  }
  async clickOnMotorInsuranceButtonFromTheProductList() {
    await this.clickButton(this.motorInsurance);
  }
  async clickOnTheBusinessOptionFromTheTop() {
    await this.clickButton(this.businessOptionOnTheTop);
  }
  async clickOnTheBIndividualOptionFromTheTop() {
    await this.clickButton(this.individualOption);
  }
  async clickOnMotorOptionForTheBusiness() {
    await this.clickButton(this.motorOptionForBusiness);
  }
  async Enter_OTP(page: Page, request: APIRequestContext, otpArray: string[]) {
    await this.enterOtp(page, request, otpArray);
  }
}
