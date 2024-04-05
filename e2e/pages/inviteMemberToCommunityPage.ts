import { faker } from "@faker-js/faker";
import { Page } from "@playwright/test";
import {
  PageAction,
  PageLocator,
  getByLabel,
  getByRole,
  getByTestId,
  getByText,
} from "@utils/pageUtils";

const csvFile = "e2e/Sample File.csv";

export const inviteMemberButton: PageLocator = getByRole({
  role: "button",
  name: "Invite Members",
});
export const rolesTab: PageLocator = getByLabel("Role");
export const communityOwnerOption: PageLocator = getByRole({
  role: "option",
  name: "Community owner",
});
export const communityManagerOption: PageLocator = getByRole({
  role: "option",
  name: "Manager",
});
export const communityMemberOption: PageLocator = getByRole({
  role: "option",
  name: "Member",
});
export const communityCustomAccessOption: PageLocator = getByRole({
  role: "option",
  name: "Custom access",
});
export const memberEmailField: PageLocator = getByTestId("email");
export const inviteButton: PageLocator = getByTestId("InviteGuests-submit");
export const uploadFileButton: PageLocator = getByTestId("GuestsInput-file");
export const removeAllButton: PageLocator = getByRole({
  role: "button",
  name: "Remove all",
});
export const disabledInviteButton: PageLocator = getByLabel(
  "Add some valid email address"
);
export const successMessage = (page: Page) => page.getByRole("alert");
export const removeMemberButton = (page: Page) =>
  page.getByTestId("inputWrapper-membersToInvite").locator("svg").nth(1);
export const invalidEmailMessage: PageLocator = getByText(
  "email must be a valid email"
);

export const enum RoleOptionsEnum {
  CommunityOwner,
  CommunityManager,
  CommunityMember,
  CommunityCustomAccess,
  CSVFile,
}

const roleOptionLocatorsMapping: Partial<Record<RoleOptionsEnum, PageLocator>> =
  {
    [RoleOptionsEnum.CommunityOwner]: communityOwnerOption,
    [RoleOptionsEnum.CommunityManager]: communityManagerOption,
    [RoleOptionsEnum.CommunityMember]: communityMemberOption,
    [RoleOptionsEnum.CommunityCustomAccess]: communityCustomAccessOption,
  };

export const inviteMembers: PageAction = async (
  page: Page,
  role: RoleOptionsEnum
) => {
  await inviteMemberButton(page).click();
  await memberEmailField(page).fill(faker.internet.email());
  await rolesTab(page).click();

  // Handle CSVFile case directly
  if (role === RoleOptionsEnum.CSVFile) {
    await uploadFileButton(page).setInputFiles(csvFile);
  } else {
    const selectRoleLocator = roleOptionLocatorsMapping[role];
    if (selectRoleLocator) {
      await selectRoleLocator(page).click();
    } else {
      throw new Error(`Invalid role: ${role}`);
    }
  }
  await inviteButton(page).click();
};

export const enum RemoveOptionEnum {
  RemoveAll,
  RemoveOneMember,
}

const removeOptionsMapping: Record<RemoveOptionEnum, PageLocator> = {
  [RemoveOptionEnum.RemoveAll]: removeAllButton,
  [RemoveOptionEnum.RemoveOneMember]: removeMemberButton,
};

export const uploadMembersThroughCSVfile: PageAction = async (
  page: Page,
  removeOption: RemoveOptionEnum
) => {
  const actionButtonLocator = removeOptionsMapping[removeOption];
  if (!actionButtonLocator) {
    throw new Error(`Invalid remove option: ${removeOption}`);
  }

  await uploadAndRemoveMembers(page, actionButtonLocator);
};

const uploadAndRemoveMembers: PageAction = async (
  page: Page,
  actionButtonLocator: PageLocator
) => {
  await inviteMemberButton(page).click();
  await uploadFileButton(page).setInputFiles(csvFile);
  const actionButton = actionButtonLocator(page);
  await actionButton.click();
};

export const inviteUserWithInvalidEmail: PageAction = async (page: Page) => {
  await inviteMemberButton(page).click();
  await memberEmailField(page).fill(`NBT ${faker.internet.email()}`);
};
