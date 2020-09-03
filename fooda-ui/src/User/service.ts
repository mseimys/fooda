import { axios, setAuthInterceptor, clearAuthInterceptor } from "../axios";
import { API } from "../constants";
import { User, UserType, anonymousUser } from "../context";

export type Credentials = {
  username: string;
  password: string;
};

export type UserSignup = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  user_type: UserType;
};

const userService = {
  signup: async (data: UserSignup) => {
    try {
      return (await axios.post<User>(API.SIGNUP, data)).data;
    } catch (err) {
      let message = String(err);
      if (err.response && err.response.data) {
        message = err.response.data;
      }
      throw Error("Error! " + JSON.stringify(message));
    }
  },
  login: async ({ username, password }: Credentials) => {
    const result = await axios.post<{ access: string; refresh: string }>(
      API.TOKEN,
      { username, password }
    );
    const token = result.data.access;
    setAuthInterceptor(token);
    const user = await userService.me();
    return { ...user, token, anonymous: false };
  },
  saveUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  getCurrentUser: () => {
    try {
      const currentUser: User = JSON.parse(
        localStorage.getItem("user") || JSON.stringify(anonymousUser)
      );
      setAuthInterceptor(currentUser.token);
      return currentUser;
    } catch (err) {}
    return anonymousUser;
  },
  logout: () => {
    clearAuthInterceptor();
    localStorage.removeItem("user");
  },
  me: async () => {
    const result = await axios.get<User>(API.USER);
    return result.data;
  },
};

export default userService;
