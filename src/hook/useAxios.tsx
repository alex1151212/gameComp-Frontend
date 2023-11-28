import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { axiosInstance } from "../api/axios";

const useAxios = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = useCallback(
    async (
      requestConfig: AxiosRequestConfig,
      responseData: (response: AxiosResponse) => void,
      failed?: (error: AxiosError) => void
    ) => {
      setIsLoading(true);
      let res;
      try {
        res = await axiosInstance.request({
          ...requestConfig,
          headers: {
            // Authorization: "Bearer develop",
            Authorization: `Bearer ${localStorage.getItem("igd-auth")}`,
          },
        });
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
