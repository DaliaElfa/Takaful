import { Locator, Page } from "@playwright/test";
import { PageBase } from "src/Base-Methods/PageBase.js";

export class welcomePage extends PageBase {
  public readonly brokerLoginButton: Locator;
  public readonly agentLoginButton: Locator;
  public readonly userNameField: Locator;
  public readonly passwordField: Locator;
  public readonly signInButton: Locator;
  public readonly verifyOTPButton: Locator;

  constructor(page: Page) {
    super(page);
    this.brokerLoginButton = this.page.locator("//span[text()='Broker Login']");
    this.agentLoginButton = this.page.locator("//span[text()='Agent Login']");
    this.userNameField = this.page.locator("#email");
    this.passwordField = this.page.locator("#password");
    this.signInButton = this.page.locator("#login-btn");
    this.verifyOTPButton = this.page.locator("//button[@type='submit']");
  }

  async clickOnAgentLoginButton() {
    await this.clickButton(this.agentLoginButton);
  }
  async fillUserNameField(username: string) {
    console.log(username);
    await this.setText(this.userNameField, username);
  }
  async fillPasswordField(password: string) {
    await this.setText(this.passwordField, password);
  }
  async clickOnSignInButton() {
    await this.clickButton(this.signInButton);
  }
  async fillingfirstOTPs(otpValues: string) {
    if (!otpValues || otpValues.length !== 6) {
      throw new Error("OTP must be a 6-digit string");
    }

    for (let i = 0; i < otpValues.length; i++) {
      const otpInput = this.page.locator(`//input[@id='otp${i}']`);
      await this.clickButton(otpInput);
      await this.setText(otpInput, otpValues[i]);
    }
  }
  async clickOnVerifyOtpButton() {
    await this.clickButton(this.verifyOTPButton);
  }
}
