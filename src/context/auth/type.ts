export type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  logout: () => void;
};

export interface UserModel {
  email: string;
  username: string;
  phone: string;
}

export type AuthModel = string;
