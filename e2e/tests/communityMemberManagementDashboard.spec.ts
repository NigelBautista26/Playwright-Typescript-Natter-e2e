import {
  ClearTagNameEnum,
  TagNameEnum,
  UserRoleEnum,
  clearFunctionTag,
  clearLocationTag,
  clearSeniorityTag,
  clearTags,
  clearTenureTag,
  createDashboardCheckBox,
  createEventCheckBox,
  editCommunityManagerCheckBox,
  editCommunityMemberRoleAndAccess,
  filterRoles,
  filterTags,
  filteredFunctionTagDisplay,
  filteredLocationTagDisplay,
  filteredRoleCommunityManager,
  filteredRoleCommunityMember,
  filteredRoleCommunityOwner,
  filteredRoleCustomMember,
  filteredSeniorityTagDisplay,
  filteredTenureTagDisplay,
  manageCommunityMembersCheckBox,
  manageP2PInsightsCheckBox,
  modifyCommunityCheckBox,
  modifyEventCheckBox,
  searchUserWithinACommunity,
  searchedCommunityUser,
  viewCommunityMembersCheckBox,
  viewCommunityMembersTagsCheckBox,
  viewDashboardCheckBox,
  viewMyConnectionsCheckBox,
  viewMyEventsCheckBox,
  viewReportsCheckBox,
} from "@pages/communityMemberManagementDashboardPage";
import { userLogin } from "@pages/loginPage";
import { expect, test } from "@playwright/test";
import { communityRoles } from "constants/communityRoles";
import { communityTags } from "constants/communityTags";

test.describe("Community member manager dashboard tests", () => {
  test.beforeEach(async ({ page }) => {
    await userLogin(page, "user1");
    await page.goto("/org/natter/communities/660409/members");
  });

  test("Filter community owner", async ({ page }) => {
    await filterRoles(page, UserRoleEnum.CommunityOwner);
    await expect(filteredRoleCommunityOwner(page)).toHaveText(
      communityRoles.communityOwner
    );
  });

  test("Filter community manager", async ({ page }) => {
    await filterRoles(page, UserRoleEnum.CommunityManager);
    await expect(filteredRoleCommunityManager(page)).toHaveText(
      communityRoles.manager
    );
  });

  test("Filter community member", async ({ page }) => {
    await filterRoles(page, UserRoleEnum.CommunityMember);
    await expect(filteredRoleCommunityMember(page)).toHaveText(
      communityRoles.member
    );
  });

  test("Filter community custom member", async ({ page }) => {
    await filterRoles(page, UserRoleEnum.CustomAccess);
    await expect(filteredRoleCustomMember(page)).toHaveText(
      communityRoles.customAccess
    );
  });

  test("Filter community member by location tag", async ({ page }) => {
    await filterTags(page, TagNameEnum.LocationTag);
    await expect(filteredLocationTagDisplay(page)).toHaveText(
      communityTags.locationTag
    );
  });

  test("Filter community member by function tag", async ({ page }) => {
    await filterTags(page, TagNameEnum.FunctionTag);
    await expect(filteredFunctionTagDisplay(page)).toHaveText(
      communityTags.functionTag
    );
  });

  test("Filter community member by tenure tag", async ({ page }) => {
    await filterTags(page, TagNameEnum.TenureTag);
    await expect(filteredTenureTagDisplay(page)).toHaveText(
      communityTags.tenureTag
    );
  });

  test("Filter community member by seniority tag", async ({ page }) => {
    await filterTags(page, TagNameEnum.SeniorityTag);
    await expect(filteredSeniorityTagDisplay(page)).toHaveText(
      communityTags.seniorityTag
    );
  });

  test("Search a user within a community", async ({ page }) => {
    await searchUserWithinACommunity(page, "abc bca");
    await expect(searchedCommunityUser(page)).toHaveText("ababc bca");
  });

  test("Filter users with both a role and a tag", async ({ page }) => {
    await filterRoles(page, UserRoleEnum.CommunityOwner);
    await filterTags(page, TagNameEnum.LocationTag);
    await expect(filteredRoleCommunityOwner(page)).toHaveText(
      communityRoles.communityOwner
    );
    await expect(filteredLocationTagDisplay(page)).toHaveText(
      communityTags.locationTag
    );
  });

  test("Remove location tag", async ({ page }) => {
    await filterTags(page, TagNameEnum.LocationTag);
    await expect(clearLocationTag(page)).toBeVisible();
    await clearTags(page, ClearTagNameEnum.ClearLocationTag);
    await expect(clearLocationTag(page)).toBeHidden();
  });

  test("Remove function tag", async ({ page }) => {
    await filterTags(page, TagNameEnum.FunctionTag);
    await expect(clearFunctionTag(page)).toBeVisible();
    await clearTags(page, ClearTagNameEnum.ClearFunctionTag);
    await expect(clearFunctionTag(page)).toBeHidden();
  });

  test("Remove tenure tag", async ({ page }) => {
    await filterTags(page, TagNameEnum.TenureTag);
    await expect(clearTenureTag(page)).toBeVisible();
    await clearTags(page, ClearTagNameEnum.ClearTenureTag);
    await expect(clearTenureTag(page)).toBeHidden();
  });

  test("Remove seniority tag", async ({ page }) => {
    await filterTags(page, TagNameEnum.SeniorityTag);
    await expect(clearSeniorityTag(page)).toBeVisible();
    await clearTags(page, ClearTagNameEnum.ClearSeniorityTag);
    await expect(clearSeniorityTag(page)).toBeHidden();
  });
  // THE CLEAR ALL OPTION IS NOT CLICKABLE...
  test.skip("Remove all tags", async ({ page }) => {
    await filterTags(page, TagNameEnum.LocationTag);
    await filterTags(page, TagNameEnum.FunctionTag);
    await filterTags(page, TagNameEnum.TenureTag);
    await filterTags(page, TagNameEnum.SeniorityTag);
    await clearTags(page, ClearTagNameEnum.ClearAllTags);
    await expect(clearLocationTag(page)).toBeHidden();
    await expect(clearFunctionTag(page)).toBeHidden();
    await expect(clearTenureTag(page)).toBeHidden();
    await expect(clearSeniorityTag(page)).toBeHidden();
  });

  test("Edit member role to a community owner", async ({ page }) => {
    await editCommunityMemberRoleAndAccess(page, UserRoleEnum.CommunityOwner);
    await expect(editCommunityManagerCheckBox(page)).toBeChecked();
    await expect(manageCommunityMembersCheckBox(page)).toBeChecked();
    await expect(viewCommunityMembersCheckBox(page)).toBeChecked();
    await expect(viewCommunityMembersTagsCheckBox(page)).toBeChecked();
    await expect(viewMyConnectionsCheckBox(page)).not.toBeChecked();
    await expect(viewMyEventsCheckBox(page)).toBeChecked();
    await expect(createEventCheckBox(page)).toBeChecked();
    await expect(modifyEventCheckBox(page)).toBeChecked();
    await expect(modifyCommunityCheckBox(page)).toBeChecked();
    await expect(viewDashboardCheckBox(page)).toBeChecked();
    await expect(viewReportsCheckBox(page)).toBeChecked();
    await expect(createDashboardCheckBox(page)).toBeChecked();
    await expect(manageP2PInsightsCheckBox(page)).toBeChecked();
  });

  test("Edit member role to a community manager", async ({ page }) => {
    await editCommunityMemberRoleAndAccess(page, UserRoleEnum.CommunityManager);
    await expect(editCommunityManagerCheckBox(page)).toBeChecked();
    await expect(manageCommunityMembersCheckBox(page)).toBeChecked();
    await expect(viewCommunityMembersCheckBox(page)).toBeChecked();
    await expect(viewCommunityMembersTagsCheckBox(page)).not.toBeChecked();
    await expect(viewMyConnectionsCheckBox(page)).toBeChecked();
    await expect(viewMyEventsCheckBox(page)).toBeChecked();
    await expect(createEventCheckBox(page)).toBeChecked();
    await expect(modifyEventCheckBox(page)).toBeChecked();
    await expect(modifyCommunityCheckBox(page)).not.toBeChecked();
    await expect(viewDashboardCheckBox(page)).toBeChecked();
    await expect(viewReportsCheckBox(page)).toBeChecked();
    await expect(createDashboardCheckBox(page)).toBeChecked();
    await expect(manageP2PInsightsCheckBox(page)).toBeChecked();
  });

  test("Edit member role to a community member", async ({ page }) => {
    await editCommunityMemberRoleAndAccess(page, UserRoleEnum.CommunityMember);
    await expect(editCommunityManagerCheckBox(page)).not.toBeChecked();
    await expect(manageCommunityMembersCheckBox(page)).not.toBeChecked();
    await expect(viewCommunityMembersCheckBox(page)).not.toBeChecked();
    await expect(viewCommunityMembersTagsCheckBox(page)).not.toBeChecked();
    await expect(viewMyConnectionsCheckBox(page)).toBeChecked();
    await expect(viewMyEventsCheckBox(page)).toBeChecked();
    await expect(createEventCheckBox(page)).not.toBeChecked();
    await expect(modifyEventCheckBox(page)).not.toBeChecked();
    await expect(modifyCommunityCheckBox(page)).not.toBeChecked();
    await expect(viewDashboardCheckBox(page)).not.toBeChecked();
    await expect(viewReportsCheckBox(page)).not.toBeChecked();
    await expect(createDashboardCheckBox(page)).not.toBeChecked();
    await expect(manageP2PInsightsCheckBox(page)).not.toBeChecked();
  });

  test("Edit member role to a community custom member", async ({ page }) => {
    await editCommunityMemberRoleAndAccess(page, UserRoleEnum.CustomAccess);
    // await editCommunityManagerCheckBox(page).click();
    await manageCommunityMembersCheckBox(page).click();
    await viewCommunityMembersCheckBox(page).click();
    await viewCommunityMembersTagsCheckBox(page).click();
    await createEventCheckBox(page).click();
    await modifyEventCheckBox(page).click();
    await modifyCommunityCheckBox(page).click();
    // await viewDashboardCheckBox(page).click();
    await viewReportsCheckBox(page).click();
    // await createDashboardCheckBox(page).click();
    // await manageP2PInsightsCheckBox(page).click();
    await expect(editCommunityManagerCheckBox(page)).toBeChecked();
    await expect(manageCommunityMembersCheckBox(page)).toBeChecked();
    await expect(viewCommunityMembersCheckBox(page)).toBeChecked();
    await expect(viewCommunityMembersTagsCheckBox(page)).toBeChecked();
    await expect(viewMyConnectionsCheckBox(page)).toBeChecked();
    await expect(viewMyEventsCheckBox(page)).toBeChecked();
    await expect(createEventCheckBox(page)).toBeChecked();
    await expect(modifyEventCheckBox(page)).toBeChecked();
    await expect(modifyCommunityCheckBox(page)).toBeChecked();
    await expect(viewDashboardCheckBox(page)).toBeChecked();
    await expect(viewReportsCheckBox(page)).toBeChecked();
    await expect(createDashboardCheckBox(page)).toBeChecked();
    await expect(manageP2PInsightsCheckBox(page)).toBeChecked();
  });
});
