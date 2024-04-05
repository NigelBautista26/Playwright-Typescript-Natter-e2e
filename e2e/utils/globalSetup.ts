import { FullConfig, chromium } from "@playwright/test";
import { userLogin } from "@pages/loginPage";

const globalSetup: (config: FullConfig) => Promise<void> = async (config) => {
  const { storageState } = config.projects[0].use;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await userLogin(page, "user1");
    await page.waitForTimeout(5000);
    await page.context().storageState({ path: storageState as string });
  } finally {
    await browser.close();
  }
};

export default globalSetup;
