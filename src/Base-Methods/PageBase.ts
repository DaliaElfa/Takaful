import { Dialog, Locator, Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import path from "path";

export class PageBase {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to web page
   * @param url - URL
   */
  async navigateToPage(url: string) {
    await this.page.goto(url);
  }

  /**
   * Wait for specific number of seconds
   * @param timeInSeconds - Number of seconds to wait
   * @deprecated Use expect assertions or auto-waiting locators instead.
   */
  async waitForSeconds(timeInSeconds: number) {
    console.warn("Usage of waitForSeconds is deprecated. Prefer auto-waiting.");
    await this.page.waitForTimeout(timeInSeconds * 15000);
  }

  /**
   * Wait for specifc web element to be visible in DOM
   * @param element - Web element selector that code should wait for
   */
  async waitUntilVisibilityOfElement(element: Locator) {
    await element.waitFor({ state: "visible", timeout: 60000 });
  }

  /**
   * Wait for specifc web element to be invisible in DOM
   * @param element - Web element locator
   */
  async waitUntilInvisibilityOfElement(element: Locator) {
    await element.waitFor({ state: "hidden", timeout: 30000 });
  }

  /**
   * Wait until visibility of button with specific name
   * @param name - The button label
   */
  async waitUntilVisibilityOfButtonByName(name: string) {
    await this.page
      .getByRole("button", { name: name })
      .waitFor({ state: "visible", timeout: 30000 });
  }

  /**
   * Wait until the spinner disappear
   */
  async waitUntilSpinnerToDisappear() {
    try {
      const spinner = this.page.locator("div.mx-underlay");
      await this.waitUntilInvisibilityOfElement(spinner);
    } catch {
      // Silently ignore if spinner doesn't exist
    }
  }

  /**
   * Click on button or any clickable web element
   * @param button - The web element locator
   */
  async clickButton(button: Locator) {
    await this.waitUntilVisibilityOfElement(button);
    await button.scrollIntoViewIfNeeded();
    await button.click();
  }

  /**
   * Wait until the page is fully loaded
   */
  async waitForLoad(urlPattern: RegExp) {
    // await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(urlPattern);
  }

  /**
   * Wait until navigation action to be done
   */
  async waitForNavigation(options: { anchorSelector: string }) {
    await expect(this.page.locator(options.anchorSelector)).toBeVisible();
  }

  /**
   * Clickig on button by name
   * @param name - The button label
   */
  async clickButtonByName(name: string) {
    await this.page.getByRole("button", { name: name }).click();
  }

  /**
   * Select specific option from Drop Down List
   * @param list - Unique locator of Drop Down List
   * @param option - The option title/index
   */
  async selectOptionFromDDL(list: Locator, option: string | number) {
    // Wait for the dropdown to be visible
    this.waitUntilVisibilityOfElement(list);

    if (typeof option === "string") {
      await list.selectOption({ label: option.trim() });
    } else {
      const options = await list.locator("option").all();
      if (option < 0 || option >= options.length) {
        throw new Error(`Index ${option} is out of bounds. Found ${options.length} options.`);
      }
      const value = await options[option].getAttribute("value");
      if (!value) {
        throw new Error(`Option at index ${option} does not have a value attribute.`);
      }
      await list.selectOption(value);
    }
    this.waitForSeconds(2);
  }

  /**
   * Select an option from list
   * @param list - The list locator
   * @param option - The option title or index
   */
  async selectItemFromList(list: Locator, option: string | number) {
    const items = list.locator("li");
    const count = await items.count();

    if (typeof option === "string") {
      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        const text = await item.textContent();
        if (text?.trim().includes(option)) {
          await item.click();
          break;
        }
      }
    } else {
      // Handle index-based selection
      if (option < 0 || option >= count) {
        throw new Error(`Index ${option} is out of bounds. Only ${count} items found.`);
      }
      await items.nth(option).click();
    }
  }

  /**
   * Clear text box
   * @param element - The text box locator
   */
  async clearText(element: Locator) {
    this.waitUntilVisibilityOfElement(element);
    await element.click();
    await element.fill("");
  }

  /**
   * Fill text box with value
   * @param textBx - The text box locator
   * @param value - The text value
   */
  async setText(textBx: Locator, value: string) {
    await this.waitUntilVisibilityOfElement(textBx);
    await this.clearText(textBx);
    await textBx.fill(value);
  }

  /**
   * Get Random number
   * @param min - The minimum number /the number of random number digits
   * @param max - The maximum number - Optional
   * @returns - Retruns the random generated number
   */
  async getRandomNumber(min: number, max?: number) {
    let rand: number;

    if (max !== undefined) {
      // Called with min and max
      rand = faker.number.int({ min: min, max: max });
    } else {
      // Called with number of digits
      const lowerBound = Math.pow(10, min - 1);
      const upperBound = Math.pow(10, min) - 1;
      rand = faker.number.int({ min: lowerBound, max: upperBound });
    }

    return rand.toString();
  }

  /**
   * Clear the browser cookies
   */
  async clearAllCookies() {
    const context = this.page.context();
    await context.clearCookies();
  }

  /**
   * Resize the browser window
   * @param width - The screen width
   * @param height -The screen height
   */
  async resizeWindow(width: number, height: number) {
    const screenSize = { width: width, height: height }; // Or any resolution you want
    await this.page.setViewportSize(screenSize);
  }

  /**
   * Scroll to the top of page
   */
  async scrollToTop() {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }

  /**
   * Scroll to the top of page
   */
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, 2500);
    });
  }

  /**
   * Scroll to the middle of page
   */
  async scrollToMiddle() {
    await this.page.evaluate(() => {
      window.scrollTo(0, 1250);
    });
  }

  /**
   * Scroll to specific x and y
   * @param x - Integer value
   * @param y - Integer value
   */
  async scrollTo(x: number, y: number) {
    await this.page.evaluate(([scrollX, scrollY]) => window.scrollTo(scrollX, scrollY), [x, y]);
  }

  /**
   * Scroll the page to specific locator
   * @param element - The element locator
   */
  async scrollToElement(element: Locator) {
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Wait the element to be clickable
   * @param element - Web Element Locator
   */
  async waitUntilElementToBeClickable(element: Locator) {
    await this.waitUntilVisibilityOfElement(element);
    await expect(element).toBeEnabled({ timeout: 30000 });
  }

  /**
   * Accept alert dialog
   */
  async acceptAlert() {
    this.page.once("dialog", async (dialog: Dialog) => {
      await dialog.accept();
    });
  }

  /**
   * Dismiss alert dialog
   */
  async dismissAlert() {
    this.page.once("dialog", async (dialog: Dialog) => {
      await dialog.dismiss();
    });
  }

  /**
   * Set text and submit in alert dialog
   * @param text - The dialog text
   */
  async alertSetTextAndAccept(text: string) {
    this.page.once("dialog", async (dialog: Dialog) => {
      if (dialog.type() === "prompt") {
        await dialog.accept(text); // Send input to the prompt and accept
      } else {
        await dialog.accept(); // Accept other dialog types just in case
      }
    });
  }

  /**
   * Get alert dialog text
   * @returns The dialog text
   */
  async getAlertText() {
    return new Promise((resolve) => {
      this.page.once("dialog", async (dialog: Dialog) => {
        resolve(dialog.message());
      });
    });
  }

  /**
   * Get element text
   * @param element - Element Locator
   * @returns - The text of the web element
   */
  async getText(element: Locator) {
    await this.waitUntilVisibilityOfElement(element);
    const text = await element.textContent();
    return text?.trim() ?? "";
  }

  /**
   * Upload file
   * @param element - The upload web element locator
   * @param fileName - The file name
   */
  async uploadFile(element: Locator, fileName: string) {
    const filePath = path.resolve(process.cwd(), "Uploads", fileName);
    await element.setInputFiles(filePath);
  }

  /**
   * Right click and select option
   * @param element - The element locator
   * @param option - The option to select
   */
  async rightClickAndChooseOption(element: Locator, option: Locator) {
    await this.waitUntilVisibilityOfElement(element);
    await element.click({ button: "right" }); // perform right-click
    await this.clickButton(option); // click the desired option
  }

  /**
   * Double click on element
   * @param element - The element locator
   */
  async doubleClick(element: Locator) {
    await this.waitUntilVisibilityOfElement(element);
    await element.dblclick();
  }

  /**
   * Move to specific locator
   * @param element - Web element Locator
   */
  async moveToElement(element: Locator) {
    await element.hover();
  }

  /**
   * Check the checkbox
   * @param checkbox - Checkbox locator
   */
  async checkBoxCheck(checkbox: Locator) {
    await checkbox.check();
  }

  /**
   * Uncheck the checkbox
   * @param checkbox - Checkbox locator
   */
  async uncheckBoxCheck(checkbox: Locator) {
    await checkbox.uncheck();
  }

  /**
   * Drag and Drop element
   * @param src - The source element locator
   * @param dest - The destination locator
   */
  async dragAndDrop(src: Locator, dest: Locator) {
    await this.waitUntilVisibilityOfElement(src);
    await this.waitUntilVisibilityOfElement(dest);
    await src.dragTo(dest);
  }

  /**
   * Switch to browser tab
   * @param number - Required tab number
   * @returns The required browser tab
   */
  async switchToBrowserTabNumber(number: number) {
    const pages = this.page.context().pages();

    if (pages.length >= number) {
      const targetPage = pages[number - 1];
      await targetPage.bringToFront(); // Focus the tab
      return targetPage;
    }
    console.warn(`Tab number ${number} does not exist. Only ${pages.length} tab(s) open.`);
    return null;
  }
  /**
   * Navigate to Left Hand Side Menu page by name
   * @param pageName
   */
  async navigateToAdminLHSMenuPage(pageName: string) {
    await this.page.locator("nav").first().waitFor({ state: "visible", timeout: 30000 });

    const collabsedMenu = this.page.locator('button[title="Menu"]');
    if (await collabsedMenu.isVisible()) {
      await this.clickButton(collabsedMenu);
    }

    const locator = this.page.locator("a, button", { hasText: pageName });
    try {
      await this.clickButton(locator);
      console.error(`Navigated to to "${pageName}":`);
    } catch (error) {
      console.error(`❌ Failed to navigate to "${pageName}":`, error);
    }
  }
}
