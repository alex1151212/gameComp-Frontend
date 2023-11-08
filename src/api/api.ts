/* eslint-disable @typescript-eslint/naming-convention */
import { Method as M } from "axios";

const Method = {
  POST: "POST" as M,
  GET: "GET" as M,
  PUT: "PUT" as M,
  PATCH: "PATCH" as M,
  DELETE: "DELETE" as M,
};
export const api = {
  test: { url: (id: string) => `/${id}`, method: Method.GET },
  ack: { url: () => `/ack`, method: Method.GET },

  //login
  login: { url: () => "/login", method: Method.POST },
  register: { url: () => "/createUser", method: Method.POST },

  recaptcha: { url: () => "/recaptcha", method: Method.POST },

  uploadFile: { url: () => "/auth/upload", method: Method.POST },
};
