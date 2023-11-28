export type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserModel | undefined>>;
  logout: () => void;
};

export interface UserModel {
  email: string;
  username: string;
  phone: string;

  isUpload: boolean;
}

export type AuthModel = string;
