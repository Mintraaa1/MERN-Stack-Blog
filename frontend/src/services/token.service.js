import { Cookies } from "react-cookie";
const cookie = new Cookies();

const getUser = () => {
  const user = cookie.get("user");
  if (!user) return null;

  return typeof user === "string" ? JSON.parse(user) : user;
};


const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

const removeuser = () => {
  cookie.remove("user", { path: "/" });
};

const setUser = (user) => {
  if (!user) {
    removeuser();
    return;
  }

  cookie.set(
    "user",
    JSON.stringify({
      id: user.id,
      username: user.username,
      accessToken: user.accessToken,
    }),
    {
      path: "/",
      expires: new Date(Date.now() + 86400 * 1000),
    }
  );
};

const TokenService = {
  getUser,
  getAccessToken,
  setUser,
  removeuser,
};

export default TokenService;
