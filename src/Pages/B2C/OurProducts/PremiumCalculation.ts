import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "src/Base-Methods/PageBase.js";

export class Premium_calculation extends PageBase {
  public readonly comprehensiveInsuranceContainer: Locator;
  public readonly addAddOns: Locator;
  public readonly roadSideAssistancePlusContainer: Locator;
  public readonly addNewDriverButton: Locator;
  public readonly nationalId_IqamaId: Locator;
  public readonly dateOfBirth: Locator;
  public readonly addDriverButton: Locator;
  public readonly proceedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.comprehensiveInsuranceContainer = this.page.locator(
      "(//h2[text()=' Comprehensive Insurance '])[2]",
    );
    this.roadSideAssistancePlusContainer = this.page.locator(
      "//h2[text()=' Road Side Assistance Plus ' and @class='text-capitalize mt-2 color-main-dark-blue font-size-24 font-weight-700 ng-star-inserted']",
    );
    this.nationalId_IqamaId = this.page.getByPlaceholder("National ID / Iqama ID");
    this.addNewDriverButton = this.page.locator("//p[text()=' Add New Driver ']");
    this.dateOfBirth = this.page.locator("//input[@name='dateOfBirth']");
    this.addDriverButton = this.page.locator("//span[text()='Add Driver']");
    this.addAddOns = this.page.locator("//p[text()=' Add Addons ']");
    this.proceedButton = this.page.locator(
      "//button[@class='d-flex gap-2 align-items-center text-capitalize md primary w-100 color-white background-main-light-blue']//span",
    );
  }

  async ClickOnComprehensiveInsurance() {
    await this.page.waitForURL("**/motor-individual-quotation-stepper/premium-calculation", {
      timeout: 30000,
    });
    await this.page.waitForTimeout(8000);
    await this.page.waitForLoadState("load");
    await this.page.waitForSelector(".spinner, .loader, .overlay, .ngx-spinner", {
      state: "detached",
      timeout: 30000,
    });
    // await this.comprehensiveInsuranceContainer.waitFor({ state: "visible", timeout: 20000 });
    //await expect(this.comprehensiveInsuranceContainer).toBeEnabled({ timeout: 1200000 });
    //await this.clickButton(this.comprehensiveInsuranceContainer);
  }
  async Add_AddOns() {
    await this.addAddOns.waitFor({ state: "visible", timeout: 20000 });

    await expect(this.addAddOns).toBeVisible({ timeout: 50000 });
    await expect(this.roadSideAssistancePlusContainer).toBeVisible({ timeout: 1200000 });

    await this.clickButton(this.addAddOns);
    await this.clickButton(this.roadSideAssistancePlusContainer);
  }
  async clickOnAddNewDriver() {
    await this.clickButton(this.addNewDriverButton);
  }

  async fillDriverInfo() {
    await this.setText(this.nationalId_IqamaId, "1058427442");
    await this.setText(this.dateOfBirth, "07-11-1985");
  }
  async clickOnAddDriverButton() {
    await this.clickButton(this.addDriverButton);
  }

  async clickOnProceedButton() {
    await this.clickButton(this.proceedButton);
  }
}
