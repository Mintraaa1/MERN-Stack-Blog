import api from "./api";
import TokenService from "./token.service";

const register = async (username, password) => {
  return await api.post("/user/register", { username, password });
};

const login = async (username, password) => {
  const response = await api.post("/user/login", { username, password });
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
