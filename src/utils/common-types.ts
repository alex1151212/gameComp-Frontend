export interface Response<T extends object> {
  code: number;
  data: {
    [key in keyof T]: T[key];
  };
  msg: string;
  total: number | null;
}
