import { Locator, Page } from "@playwright/test";
import { PageBase } from "../../../Base-Methods/PageBase.js";

export class VerificationCodePage extends PageBase {
  public readonly OTPContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.OTPContainer = this.page.locator("[id^='otp_0_']");
  }

  async fillTheFirstOTPContainer() {
    const otp = "123456";
    await this.page.keyboard.type(otp);
    await this.waitForSeconds(2);
  }
}
