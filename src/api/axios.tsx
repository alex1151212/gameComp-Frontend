import axios, { AxiosError } from "axios";
import { camelCaseKeys } from "../utils/helper";

export interface ICommonError {
  Code: number;
  Data: string | null;
  Msg: string | null;
  Total: number | null;
}

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  timeout: 60 * 1000 * 60,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.params) {
      // 如果需要轉大寫再用下面這行
      // config.params = pascalCaseKeys(config.params);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelCaseKeys(response.data);
    }
    return response;
  },
  (error: AxiosError<ICommonError>) => {
    let message = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          message = "請重新登入";
          localStorage.removeItem("igd-auth");
          break;
      }
    }

    return Promise.reject({
      ...error,
      message: { text: message, type: "error" },
    });
  }
);

axios.defaults.baseURL = `${import.meta.env.BACKEND_URL}${
  import.meta.env.API_PATH
}`;

export { axiosInstance };
