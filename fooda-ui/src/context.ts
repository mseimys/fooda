import { createContext } from "react";

export enum UserType {
  REGULAR,
  OWNER,
  ANONYMOUS,
}

export type User = {
  isAnonymous: boolean;
  type: UserType;
  name: string;
  token: string;
};

export const anonymousUser = {
  isAnonymous: true,
  type: UserType.ANONYMOUS,
  name: "Anonymous",
  token: "",
};

export const RootContext = createContext({
  setUser: (arg0: User) => {},
  clearUser: () => {},
  user: anonymousUser,
});
