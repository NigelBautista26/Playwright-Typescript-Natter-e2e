type DevUsersType = {
  [key: string]: { username: string; password: string };
};

export const devUsers: DevUsersType = {
  admin: { username: "apecherz+02@rst.com.pl", password: "Password123" },
  regular: {
    username: "apecherz+playwright@rst.com.pl",
    password: "Password.123",
  },
  user1: { username: "nigel@natter.co", password: "Qwerty1234567!" },
  userWithoutAccount: {
    username: "emailthat@doesntexist.com",
    password: "Qwerty1234567!",
  },
  userWithoutCommunity: {
    username: "apecherz+withoutcommunity@rst.com.pl",
    password: "Password.123",
  },
};
