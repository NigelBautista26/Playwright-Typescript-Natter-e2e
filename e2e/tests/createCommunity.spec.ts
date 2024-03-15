import {
  communityCreationSuccessfulMessage,
  CommunityScenarioEnum,
  createCommunityScenarios,
  createCommunitySteps,
  editFunctionTagField,
  editLocationTagField,
  editSeniorityTagField,
  editTenureTagField,
  locationTagErrorMessage,
  nameEmptyErrorMessage,
  nameFieldErrorMessage,
  tagShortValueErrorMessage,
} from "@pages/createCommunityPage";
import { userLogin } from "@pages/loginPage";
import { expect, test } from "@playwright/test";
import { createCommunityAssertionMessages } from "constants/createCommunityAssertionMessages";

test.describe("Create Community Tests", () => {
  test.beforeEach(async ({ page }) => {
    await userLogin(page, "user1");
    await page.goto("/org/natter/communities");
  });

  test("Create A Valid Community", async ({ page }) => {
    await createCommunitySteps(page);
    await expect(communityCreationSuccessfulMessage(page)).toHaveText(
      createCommunityAssertionMessages.communityCreationSuccessMessage
    );
  });

  test.skip("Create Community without a community name", async ({ page }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.EmptyCommunityName
    );
    await expect(nameFieldErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.nameTooShortErrorMessage
    );
  });

  test("Create Community With an empty location tag", async ({ page }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.LocationTagEmpty
    );
    await expect(locationTagErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.atLeastOneTagRequired
    );
  });

  test("Create Community With a short location tag value", async ({ page }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.LocationTagShortValue
    );
    await expect(tagShortValueErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.tagValueTooShortErrorMessage
    );
  });

  test("Create Community and then edit the category name of the location tag with an empty value", async ({
    page,
  }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.EditLocationTagCategoryNameWithEmptyValue
    );
    await expect(nameEmptyErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.nameEmptyErrorMessage
    );
  });

  test("Create Community and then edit the category name of the location tag with a new value", async ({
    page,
  }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.EditLocationTagCategoryNameWithNewValue
    );
    await expect(editLocationTagField(page)).toHaveValue(
      "Location-Rename-Test"
    );
  });

  test("Create Community With an empty function tag", async ({ page }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.FunctionTagEmpty
    );
    await expect(locationTagErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.atLeastOneTagRequired
    );
  });

  test("Create Community With a short function tag value", async ({ page }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.FunctionTagShortValue
    );
    await expect(tagShortValueErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.tagShortValueErrorMessage
    );
  });

  test("Create Community and then edit the category name of the function tag with an empty value", async ({
    page,
  }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.EditFunctionTagCategoryNameWithEmptyValue
    );
    await expect(nameEmptyErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.nameEmptyErrorMessage
    );
  });

  test("Create Community and then edit the category name of the function tag with a new value", async ({
    page,
  }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.EditFunctionTagCategoryNameWithNewValue
    );
    await expect(editFunctionTagField(page)).toHaveValue(
      "Function-Rename-Test"
    );
  });

  test("Create Community With an empty tenure tag", async ({ page }) => {
    await createCommunityScenarios(page, CommunityScenarioEnum.TenureTagEmpty);
    await expect(locationTagErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.atLeastOneTagRequired
    );
  });

  test("Create Community With a short tenure tag value", async ({ page }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.TenureTagShortValue
    );
    await expect(tagShortValueErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.tagShortValueErrorMessage
    );
  });

  test("Create Community and then edit the category name of the tenure tag with an empty value", async ({
    page,
  }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.EditTenureTagCategoryNameWithEmptyValue
    );
    await expect(nameEmptyErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.nameEmptyErrorMessage
    );
  });

  test("Create Community and then edit the category name of the tenure tag with a new value", async ({
    page,
  }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.EditTenureTagCategoryNameWithNewValue
    );
    await expect(editTenureTagField(page)).toHaveValue("Tenure-Rename-Test");
  });

  test("Create Community With an empty seniority tag", async ({ page }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.SeniorityTagEmpty
    );
    await expect(locationTagErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.atLeastOneTagRequired
    );
  });

  test("Create Community With a short seniority tag value", async ({
    page,
  }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.SeniorityTagShortValue
    );
    await expect(tagShortValueErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.tagShortValueErrorMessage
    );
  });

  test("Create Community and then edit the category name of the seniority tag with an empty value", async ({
    page,
  }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.EditSeniorityTagCategoryNameWithEmptyValue
    );
    await expect(nameEmptyErrorMessage(page)).toHaveText(
      createCommunityAssertionMessages.nameEmptyErrorMessage
    );
  });

  test("Create Community and then edit the category name of the seniority tag with a new value", async ({
    page,
  }) => {
    await createCommunityScenarios(
      page,
      CommunityScenarioEnum.EditSeniorityTagCategoryNameWithNewValue
    );
    await expect(editSeniorityTagField(page)).toHaveValue(
      "Seniority-Rename-Test"
    );
  });
});
