import { createContext } from "react";

export enum UserType {
  REGULAR = "REGULAR",
  OWNER = "OWNER",
}

export type User = {
  id: number;
  username?: string;
  email?: string;
  user_type?: UserType;
  first_name?: string;
  last_name?: string;
  token: string;
  anonymous: boolean;
};

export const anonymousUser: User = {
  id: 0,
  first_name: "Anonymous",
  token: "",
  anonymous: true,
};

export const RootContext = createContext({
  setUser: (arg0: User) => {},
  clearUser: () => {},
  user: anonymousUser,
});
