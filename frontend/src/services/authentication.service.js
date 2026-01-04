import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_URL;

const register = async (username, password) => {
  return await api.post(API_URL + "/register", { username, password });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/login", { username, password });
  const { status, data } = response;

  if (status === 200 && data?.token) {
    TokenService.setUser({
      username,
      accessToken: data.token,
    });
  }

  return response;
};

const logout = () => {
  TokenService.removeuser();
};

export default {
  register,
  login,
  logout,
};
