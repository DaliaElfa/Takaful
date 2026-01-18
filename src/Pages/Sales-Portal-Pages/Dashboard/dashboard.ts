import { Locator, Page } from "@playwright/test";
import { PageBase } from "src/Base-Methods/PageBase.js";

export class dashboard extends PageBase {
  public readonly quotationsTxtButton: Locator;
  public readonly createButton: Locator;
  constructor(page: Page) {
    super(page);
    this.quotationsTxtButton = this.page.locator("//div[text()=' Quotations ']");
    this.createButton = this.page.locator("//span[text()=' Create']");
  }

  async clickOnQuotationsTextButton() {
    await this.clickButton(this.quotationsTxtButton);
  }
  async clickOnCreatButton() {
    await this.clickButton(this.createButton);
  }
}
