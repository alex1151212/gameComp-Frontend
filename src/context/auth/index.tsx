import { createContext } from "react";
import { AuthContextProps } from "./type";

const initAuthContextPropsState = {
  auth: localStorage.getItem("token")
    ? { token: localStorage.getItem("token") ?? "" }
    : undefined,
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

export { AuthContext };
