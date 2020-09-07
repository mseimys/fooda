import axios from "axios";

let authInterceptor: any;

export const setAuthInterceptor = (token: string) => {
  if (!token) {
    axios.interceptors.request.eject(authInterceptor);
    return;
  }
  authInterceptor = axios.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export const clearAuthInterceptor = () => {
  axios.interceptors.request.eject(authInterceptor);
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && error.config.url !== "/api/token/") {
      console.warn("Unauthorized, logging out ...");
      window.location.href = "/login";
    }
    return Promise.reject(error.response);
  }
);

export { axios };
