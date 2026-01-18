import { test } from "@playwright/test";
import { PageManager } from "../../../../src/Page-Manager/PageManager.js";
import { JsonReader } from "../../../../utils/JsonReader.js";

test.describe("Start ART", () => {
  let pm: any;
  test("Open the ART website", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    pm = new PageManager(page);
    await pm.ARTHomePage().openArtPage(JsonReader.getEnv("dev").baseUrl);

    await page.context().storageState({ path: "storageState.json" });
    await browser.close();
  });
});
