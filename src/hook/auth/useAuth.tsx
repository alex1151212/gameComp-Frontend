import { FC, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { AuthContext } from "../../context/auth";
import { AuthModel, UserModel } from "../../context/auth/type";
import * as authHelper from "./authHelper";

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const saveAuth = (auth: AuthModel | undefined) => {
    if (auth) {
      authHelper.setAuth(auth);
      userHandler(auth);
    } else {
      authHelper.removeAuth();
      userHandler(auth);
    }
    setAuth(auth);
  };

  const logout = () => {
    saveAuth(undefined);
  };

  const userHandler = (auth: AuthModel | undefined) => {
    if (auth && auth) {
      const user = decodeToken<UserModel>(auth);
      console.log(user);

      if (user) setCurrentUser(user);
      else setCurrentUser(undefined);
    }
  };

  useEffect(() => {
    userHandler(auth);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default useAuth;
