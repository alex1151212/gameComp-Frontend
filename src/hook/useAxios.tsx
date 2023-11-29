import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { axiosInstance } from "../api/axios";

const useAxios = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(
    async (action?: string) => {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }

      const token = await executeRecaptcha(action);

      return token;
    },
    [executeRecaptcha]
  );

  const sendRequest = useCallback(
    async (
      requestConfig: AxiosRequestConfig,
      responseData: (response: AxiosResponse) => void,
      action?: string,
      failed?: (error: AxiosError) => void
    ) => {
      setIsLoading(true);

      let res;
      try {
        if (requestConfig.method === "POST" || requestConfig.method === "PUT") {
          const token = await handleReCaptchaVerify(action);

          res = await axiosInstance.request({
            ...requestConfig,
            headers: {
              // Authorization: "Bearer develop",
              // CaptchaSecret: import.meta.env.VITE_RECAPTCHA_SECRET_KEY,
              CaptchaResponse: token,
              Authorization: `Bearer ${localStorage.getItem("igd-auth")}`,
            },
          });
        } else {
          res = await axiosInstance.request({
            ...requestConfig,
            headers: {
              // Authorization: "Bearer develop",
              Authorization: `Bearer ${localStorage.getItem("igd-auth")}`,
            },
          });
        }
      } catch (error) {
        failed && failed(error as AxiosError);
      } finally {
        if (res) {
          responseData(res);
        }
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    sendRequest,
  };
};

export default useAxios;
