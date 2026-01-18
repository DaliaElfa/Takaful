import { Page } from "@playwright/test";
import { quotations } from "src/Pages/Sales-Portal-Pages/Create_quotations/quotations.js";
import { dashboard } from "src/Pages/Sales-Portal-Pages/Dashboard/dashboard.js";
import { welcomePage } from "src/Pages/Sales-Portal-Pages/onboardingpage/welcomePage.js";

export class PageManager2 {
  public static instance: PageManager2 | null = null;
  public readonly page: Page;
  public readonly onBoardingPage: welcomePage;
  public readonly myhomepage: dashboard;
  public readonly myquotations: quotations;

  constructor(page: Page) {
    this.page = page;
    this.onBoardingPage = new welcomePage(this.page);
    this.myhomepage = new dashboard(this.page);
    this.myquotations = new quotations(this.page);
  }

  public static getInstance(page: Page): PageManager2 {
    if (!PageManager2.instance) {
      PageManager2.instance = new PageManager2(page);
    }
    return PageManager2.instance;
  }

  inOnboardingPage() {
    return this.onBoardingPage;
  }
  inHomePage() {
    return this.myhomepage;
  }
  inQuotationsPage() {
    return this.myquotations;
  }
}
