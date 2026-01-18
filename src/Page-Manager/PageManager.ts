import { Page } from "@playwright/test";
import { home_Page } from "../Pages/B2C/HomeARTPage/homePage.js";
import { MotorInsurancePage } from "../Pages/B2C/OurProducts/MotorInsurancePage.js";
import { VerificationCodePage } from "src/Pages/B2C/VerificationCodePage/VerificationCode-Page.js";
import { BusinessMotorInsurance } from "src/Pages/B2C/OurProducts/MotorInsurancePage-Business.js";
import { Premium_calculation } from "src/Pages/B2C/OurProducts/PremiumCalculation.js";

export class PageManager {
  public static instance: PageManager | null = null;
  public readonly page: Page;
  public readonly homePage: home_Page;
  public readonly motorInsurancePage: MotorInsurancePage;
  public readonly verification_CodePage: VerificationCodePage;
  public readonly motorinsuranceformforbusiness: BusinessMotorInsurance;
  public readonly premiumcalculationpage: Premium_calculation;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new home_Page(this.page);
    this.motorInsurancePage = new MotorInsurancePage(this.page);
    this.verification_CodePage = new VerificationCodePage(this.page);
    this.motorinsuranceformforbusiness = new BusinessMotorInsurance(this.page);
    this.premiumcalculationpage = new Premium_calculation(this.page);
  }

  public static getInstance(page: Page): PageManager {
    if (!PageManager.instance) {
      PageManager.instance = new PageManager(page);
    }
    return PageManager.instance;
  }

  ARTHomePage() {
    return this.homePage;
  }
  InMotorInsurancePage() {
    return this.motorInsurancePage;
  }
  InVerificationCodePage() {
    return this.verification_CodePage;
  }
  InBusinessMotorInsurancePage() {
    return this.motorinsuranceformforbusiness;
  }
  InPremiumCalculationPage() {
    return this.premiumcalculationpage;
  }
}
