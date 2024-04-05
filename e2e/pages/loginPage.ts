import { Page } from "@playwright/test";
import { envUsers } from "@utils/environmentUsersLogic";
import { PageAction, PageLocator, getByTestId } from "@utils/pageUtils";
import { getEnvironmentConfig } from "@playwrightConfig/playwright.config";

export const emailField: PageLocator = getByTestId("login-username-input");
export const passwordField: PageLocator = getByTestId("login-password-input");
export const loginButton: PageLocator = getByTestId("login-submit");

const gotoBaseUrl: PageAction = async (page: Page) => {
  const { baseURL } = getEnvironmentConfig();
  await page.goto(baseURL);
};

export const userLogin: PageAction = async (page: Page, user: string) => {
  await gotoBaseUrl(page);
  await emailField(page).fill(envUsers[user].username);
  await passwordField(page).fill(envUsers[user].password);
  await loginButton(page).click();
};
