import { Locator, Page } from "@playwright/test";
import { PageBase } from "src/Base-Methods/PageBase.js";

export class BusinessMotorInsurance extends PageBase {
  public readonly crNumber: Locator;
  public readonly nationalID_Iqama: Locator;
  public readonly mobileNumber: Locator;
  public readonly emailAddress: Locator;
  public readonly agentCode_Optional: Locator;
  public readonly policyStartDateCalendarIcon: Locator;
  public readonly policyStartDateCalendarDayOption: Locator;
  public readonly yesButton: Locator;
  public readonly noButton: Locator;
  public readonly zatchaVatNumber: Locator;
  public readonly uploadZatchaExceptionLetter: Locator;
  public readonly acceptAndProceedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.crNumber = this.page.getByPlaceholder("7xxxxxxxxxx");
    this.nationalID_Iqama = this.page.locator(
      "(//label[text()=' National ID / Iqama Number ']//following::input[1])[1]",
    );
    this.mobileNumber = this.page.locator(
      "(//label[text()=' Mobile Number ']//following::input[1])[1]",
    );
    this.emailAddress = this.page.locator(
      "(//label[text()=' Email Address ']//following::input[1])[1]",
    );
    this.agentCode_Optional = this.page.locator(
      "(//label[text()=' Agent Code (Optional) ']//following::input[1])[1]",
    );
    this.policyStartDateCalendarIcon = this.page.locator(
      "//span[@class='mat-mdc-button-touch-target']",
    );
    this.policyStartDateCalendarDayOption = this.page.locator("//span[text()=10]");
    this.yesButton = this.page.locator("//label[text()=' Yes ']");
    this.noButton = this.page.locator("//label[text()=' No ']");
    this.zatchaVatNumber = this.page.locator("//input[@placeholder='xxxxxxxxxxxxxxx']");
    this.uploadZatchaExceptionLetter = this.page.locator("//input[@id='customFile']");
    this.acceptAndProceedButton = this.page.locator("//button[@type='submit']");
  }

  async fillingMotorInsuranceFormForBusiness() {
    await this.setText(this.crNumber, "15151515");
  }
}
