import { Response } from "../../../utils/common-types";

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}
export type RegisterResponse = Response<{
  token: string;
}>;
