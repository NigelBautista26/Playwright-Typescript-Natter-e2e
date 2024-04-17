import { devUsers } from "./devUsers";
import { localUsers } from "./localUsers";

export const envUsers = process.env.NODE_ENV === "dev" ? devUsers : localUsers;
