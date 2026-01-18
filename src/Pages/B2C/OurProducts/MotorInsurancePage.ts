import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../../../Base-Methods/PageBase.js";

export class MotorInsurancePage extends PageBase {
  public readonly getYourPolicyNow: Locator;
  public readonly nationalID_IqamaIDField: Locator;
  public readonly dateOfBirthField: Locator;
  public readonly dateOfBirthIcon: Locator;
  public readonly dateOfBirthYear: Locator;
  public readonly dateOfBirthMonth: Locator;
  public readonly mobileNumberField: Locator;
  public readonly emailAddressField: Locator;
  public readonly sequenceNumberSection: Locator;
  public readonly ownerShipTransfer: Locator;
  public readonly customNumberSection: Locator;
  public readonly sequenceNumberFieldFromTheSequenceNumberSection: Locator;
  public readonly acceptAndProceedButton: Locator;
  public readonly policyStartDate: Locator;
  public readonly checkBoxForAgreement: Locator;
  public readonly policyStartDateErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.policyStartDateErrorMessage = this.page.locator(
      "//small[@class='text-danger font-size-14 font-weight-400 ms-3 line-height-normal ng-star-inserted']",
    );
    this.getYourPolicyNow = this.page.locator(
      "//button[@class='d-flex gap-2 align-items-center text-capitalize lg primary w-100 color-white background-main-light-blue']",
    );
    this.nationalID_IqamaIDField = this.page.getByPlaceholder("National ID / Iqama ID");
    this.dateOfBirthField = this.page.locator("//input[@name='dateOfBirth']");
    this.mobileNumberField = this.page.getByPlaceholder("5XXXXXXXX");
    this.sequenceNumberSection = this.page.locator("//*[@id='SEQUENCE_NUMBER']");
    this.sequenceNumberFieldFromTheSequenceNumberSection = this.page
      .locator("input[placeholder='Sequence Number']")
      .nth(1);
    this.ownerShipTransfer = this.page.locator("//*[@id='OWNERSHIP_TRANSFER']");
    this.customNumberSection = this.page.locator("//*[@id='CUSTOM_NUMBER']");
    this.dateOfBirthIcon = this.page.locator("(//span[@class='mat-mdc-button-touch-target'])[1]");
    this.dateOfBirthYear = this.page.locator("//span[text()=' 2025 ']");
    this.dateOfBirthMonth = this.page.locator("//span[text()=' JAN ']");
    this.emailAddressField = this.page.getByPlaceholder("Example@domain.com");
    this.acceptAndProceedButton = this.page.locator("//span[text()='Accept and Proceed']");
    this.policyStartDate = this.page.getByPlaceholder("DD-MM-YYYY");
    this.checkBoxForAgreement = this.page.locator("#policyMarketingConsentFlag");
  }

  async clickOnGetYourPolicyNowAfterClickingOnMotorInsuranceOption() {
    await this.scrollToElement(this.getYourPolicyNow);
    await this.clickButton(this.getYourPolicyNow);
  }

  async fillingThePolicyHolderDetails(
    nationalID_IqamaID: string,
    mobileNumber: string,
    emailAddress: string,
    sequenceNumber: string,
  ) {
    await this.setText(this.nationalID_IqamaIDField, nationalID_IqamaID);
    await this.clickButton(this.dateOfBirthIcon);
    await this.clickButton(this.dateOfBirthYear);
    await this.clickButton(this.dateOfBirthMonth);
    await this.setText(this.mobileNumberField, mobileNumber);
    await this.setText(this.emailAddressField, emailAddress);
    await this.page.keyboard.press("Tab");
    await this.clickButton(this.sequenceNumberSection);
    await this.setText(this.sequenceNumberFieldFromTheSequenceNumberSection, sequenceNumber);
    await this.clickButton(this.acceptAndProceedButton);
    await this.waitForSeconds(2);
  }
  async checkIfPolicyStartDateCantTakePastDays(): Promise<string> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const day = String(yesterday.getDate()).padStart(2, "0");
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const year = yesterday.getFullYear();

    return `${day}-${month}-${year}`;
  }
  async getErrorMessageForThePolicyStartDate(): Promise<string> {
    const pastDate = this.checkIfPolicyStartDateCantTakePastDays();
    await this.setText(this.policyStartDate, await pastDate);
    await this.page.keyboard.press("Tab");
    await expect(this.policyStartDateErrorMessage).toBeVisible({
      timeout: 5000,
    });
    const errorMessage = await this.getText(this.policyStartDateErrorMessage);
    console.log(`Policy Start Date Error Message: ${errorMessage}`);
    return errorMessage;
  }
}
