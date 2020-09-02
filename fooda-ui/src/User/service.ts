import { axios } from "../axios";
import { API } from "../constants";
import { User, UserType } from "../context";

type Credentials = {
  username: string;
  password: string;
};

export type UserSignup = {
  username: string;
  email: string;
  password: string;
  user_type: UserType;
};

export default {
  signup: async (data: UserSignup) => {
    try {
      return (
        await axios.post<User>(API.SIGNUP, data, {
          withCredentials: true,
        })
      ).data;
    } catch (err) {
      let message = String(err);
      if (err.response && err.response.data) {
        message = err.response.data;
      }
      throw "Error! " + JSON.stringify(message);
    }
  },
  login: async ({ username, password }: Credentials) => {
    const result = await axios.post<{ access: string; refresh: string }>(
      API.TOKEN,
      { username, password }
    );
    return result.data;
  },
  me: async (token: string) => {
    const result = await axios.get<User>(API.USER, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
};
