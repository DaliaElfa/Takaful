import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "src/Base-Methods/PageBase.js";

export class quotations extends PageBase {
  public readonly smeOption: Locator;
  public readonly individualOption: Locator;
  public readonly motorBusinessOption: Locator;
  public readonly nationalID_IqamaNumbe: Locator;
  public readonly emailID: Locator;
  public readonly mobile: Locator;
  public readonly birthYear: Locator;
  public readonly birthMonth: Locator;
  public readonly verifyButton: Locator;
  public readonly policyStartDate: Locator;
  public readonly nextButton: Locator;
  public readonly addVehicleButton: Locator;
  public readonly sequenceNumber: Locator;
  public readonly addTheVehicleInformationButton: Locator;
  public readonly smartInsuranceCheckBox: Locator;
  public readonly continueButton: Locator;
  public readonly proceedButton: Locator;
  public readonly summaryCheckBox: Locator;
  public readonly generateQuoteButton: Locator;
  public readonly infoButton: Locator;
  public readonly smartInsuranceInfoPlanTitle: Locator;
  public readonly smartInsurancePricePlan: Locator;
  public readonly comprehensiveInsurancePlanTitle: Locator;
  public readonly comprehensivePricePlan: Locator;
  public readonly thirdPartInsurancePlanTitle: Locator;
  public readonly thirdPartyPricePlan: Locator;
  public readonly crField: Locator;
  public readonly vatField: Locator;

  constructor(page: Page) {
    super(page);

    this.vatField = page.locator("//input[@minlength ='15' and @maxlength='15'] ");
    this.crField = page.locator("//input[@minlength ='10' and @maxlength='10'] ");

    this.smartInsuranceInfoPlanTitle = page.locator("//div[text()=' Smart Insurance ']");
    this.smartInsurancePricePlan = page.locator(
      "(//div[@class='center-align ng-star-inserted'])[1]",
    );
    this.comprehensiveInsurancePlanTitle = page.locator(
      "//div[text()=' Comprehensive Insurance ']",
    );
    this.comprehensivePricePlan = page.locator(
      "(//div[@class='center-align ng-star-inserted'])[2]",
    );
    this.thirdPartInsurancePlanTitle = page.locator("//div[text()=' Third-Party Insurance ']");
    this.thirdPartyPricePlan = page.locator("(//div[@class='center-align ng-star-inserted'])[3]");

    this.infoButton = page.locator("//mat-icon[text()='info_outline']");
    this.generateQuoteButton = page.locator("//span[text()='Generate Quote']");
    this.summaryCheckBox = page.locator("//span[@class='mat-checkbox-background']");
    this.proceedButton = page.locator("//span[text()='Proceed']");
    this.continueButton = page.locator("//span[text()='Continue']");
    this.smartInsuranceCheckBox = page.locator("(//label[@class='mat-checkbox-layout'])[1]");

    this.smeOption = page.locator("//div[text()=' SME ']");
    this.motorBusinessOption = page.locator("//div[text()=' Motor ']");
    this.individualOption = page.locator("//div[text()=' Individual ']");

    this.nationalID_IqamaNumbe = page.locator("input[minlength='10'][maxlength='10']");
    this.emailID = page.locator("input[matinput][type='email']");
    this.mobile = page.locator("input[matinput][minlength='9'][maxlength='9']");
    this.birthYear = page.locator("input[matinput][role='combobox'][minlength='4'][maxlength='4']");
    this.birthMonth = page.locator(
      "(//input[@matinput and @role='combobox' and @aria-autocomplete='list'])[2]",
    );
    this.verifyButton = page.locator("//span[text()='VERIFY']");

    this.policyStartDate = page.locator("input[matinput][data-mat-calendar]");
    this.nextButton = page.locator("//span[text()='Next' and @class='mat-button-wrapper']");
    this.addVehicleButton = page.locator(
      "//span[text()=' Add Vehicle' and @class='mat-button-wrapper']",
    );
    this.sequenceNumber = page.locator(
      "//input[@maxlength='10' and @data-placeholder='Sequence Number']",
    );
    this.addTheVehicleInformationButton = page.locator("//span[text()='Add']");
  }

  private async clickElement(locator: Locator) {
    await this.clickButton(locator);
  }

  private async fillField(locator: Locator, value: string) {
    await this.setText(locator, value);
  }

  private async assertVisible(...locators: Locator[]) {
    for (const locator of locators) {
      await expect(locator).toBeVisible({ timeout: 10000 });
    }
  }

  async fillTheCRfield(CR: string) {
    await this.fillField(this.crField, CR);
  }

  async checkThePlansCoverage() {
    await this.assertVisible(
      this.smartInsuranceInfoPlanTitle,
      this.comprehensiveInsurancePlanTitle,
      this.thirdPartInsurancePlanTitle,
    );

    const smartInsuranceCoverage = await this.getText(this.smartInsurancePricePlan);
    const comprehensiveCoverage = await this.getText(this.comprehensivePricePlan);
    const thirdPartyCoverage = await this.getText(this.thirdPartyPricePlan);

    console.log(comprehensiveCoverage, smartInsuranceCoverage, thirdPartyCoverage);

    expect(comprehensiveCoverage).toBeTruthy();
    expect(smartInsuranceCoverage).toBeTruthy();
    expect(thirdPartyCoverage).toBeTruthy();

    await this.page.locator("(//span[text()='Select'])[1]").click();
  }

  async clickOnSME() {
    await this.clickElement(this.smeOption);
  }
  async clickOnIndividual() {
    await this.clickElement(this.individualOption);
  }
  async clickOnProceedButton() {
    await this.clickElement(this.proceedButton);
  }
  async clickOnClassOfBusinessMotorType() {
    await this.clickElement(this.motorBusinessOption);
  }

  async fillCustomerInformation(
    nationalID_IqamaID: string,
    emailAddress: string,
    mobileNumber: string,
    birthYearValue?: string,
    birthMonthValue?: string,
  ) {
    await this.fillField(this.nationalID_IqamaNumbe, nationalID_IqamaID);
    await this.fillField(this.emailID, emailAddress);
    await this.mobile.focus();
    await this.fillField(this.mobile, mobileNumber);

    if (birthYearValue) {
      await this.fillField(this.birthYear, birthYearValue);
      await this.birthYear.press("Enter");
    }
    if (birthMonthValue) {
      await this.fillField(this.birthMonth, birthMonthValue);
      await this.birthMonth.press("Tab");
    }
    await this.clickElement(this.verifyButton);
  }

  async fillSMECustomerInformation(emailAddress: string, mobileNumber: string, vat: string) {
    await this.fillField(this.emailID, emailAddress);
    await this.mobile.focus();
    await this.fillField(this.mobile, mobileNumber);
    await this.fillField(this.vatField, vat);
    await this.clickElement(this.verifyButton);
  }

  async getTomorrowsDate(): Promise<string> {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async fillPolicyStartDate() {
    await this.scrollToElement(this.policyStartDate);
    await this.policyStartDate.focus();
    await this.fillField(this.policyStartDate, await this.getTomorrowsDate());
    await this.policyStartDate.press("Escape");
  }

  async clickOnNextButton() {
    await this.clickElement(this.nextButton);
  }
  async clickOnGenerateQuoteButton() {
    await this.clickElement(this.generateQuoteButton);
  }
  async clickOnAddVehicleButton() {
    await this.clickElement(this.addVehicleButton);
  }
  async fillTheSequenceNumber(sequenceNumber: string) {
    await this.fillField(this.sequenceNumber, sequenceNumber);
  }
  async clickOnAddVehicleInformationButton() {
    await this.clickElement(this.addTheVehicleInformationButton);
  }
  async clickOnInfoPlans() {
    await this.clickElement(this.infoButton);
  }

  async clickOnSummaryCheckBox() {
    await this.summaryCheckBox.scrollIntoViewIfNeeded();
    const box = await this.summaryCheckBox.boundingBox();
    if (!box) throw new Error("Checkbox bounding box not found");
    await this.summaryCheckBox.click({
      position: { x: box.width / 2, y: box.height / 2 },
      force: true,
    });
  }

  async clickOnContinueButton() {
    await this.clickElement(this.continueButton);
  }
}
