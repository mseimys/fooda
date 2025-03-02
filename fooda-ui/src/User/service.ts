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
      const message = JSON.stringify(err.data);
      throw Error(message);
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
    const result = await axios.get<User>(API.ME);
    return result.data;
  },

  getUser: async (userId: number) => {
    const result = await axios.get<User>(API.USER(userId));
    return result.data;
  },

  blockUser: async (restaurant: number, user: number) => {
    await axios.post(API.BLOCKED_USERS, { restaurant, user });
  },

  getBlockedUsers: async (owner: number) => {
    return (await axios.get(`${API.BLOCKED_USERS}?owner=${owner}`)).data;
  },

  deleteBlockedUser: async (id: number) => {
    return (await axios.delete(API.BLOCKED_USER(id))).data;
  },
};

export default userService;
