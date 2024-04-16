import { faker } from "@faker-js/faker";
import { Locator, Page } from "@playwright/test";
import {
  PageAction,
  PageLocator,
  getByPlaceholder,
  getByText,
} from "@utils/pageUtils";

export const searchCommunityField: PageLocator =
  getByPlaceholder("Search community");
export const searchedCommunityNotFound: PageLocator = getByText(
  "No matching communities found"
);
export const searchedCommunityName = (page: Page): Readonly<Locator> =>
  page.getByTestId("CommunityCard-4012366").getByTestId("CommunityCard-titles");

export const searchCommunity: PageAction = async (
  page: Page
): Promise<void> => {
  await searchCommunityField(page).fill("Test");
};

export const searchCommunityNotFound: PageAction = async (
  page: Page
): Promise<void> => {
  const searchField = await page.getByPlaceholder("Search community");
  await searchField.fill(faker.string.alpha(10));
};
