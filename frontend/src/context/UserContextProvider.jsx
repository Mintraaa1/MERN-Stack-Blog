import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import TokenService from "../services/token.service";

//export const UserContext = createContext({});
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    return TokenService.getUser() || null;
  });
    function getUser() {
        const savedUser = TokenService.getUser
        () || null;
        return savedUser;
    }
    useEffect(() => {
        TokenService.setUser(userInfo);
    } , [userInfo]);
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};