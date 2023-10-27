import { Response } from "../../../utils/common-types";

export interface LoginRequest {
  email: string;
  password: string;
}
export type LoginResponse = Response<{
  token: string;
}>;
