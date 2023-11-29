import { AuthModel } from "../../context/auth/type";

const AUTH_LOCAL_STORAGE_KEY = "igd-auth";

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  return lsValue;
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, auth);
    console.log("AUTH LOCAL STORAGE SAVED");
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    // console.log("AUTH LOCAL STORAGE REMOVED");
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
