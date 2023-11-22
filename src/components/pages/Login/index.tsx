import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../../api";
import useAuth from "../../../hook/auth/useAuth";
import useAxios from "../../../hook/useAxios";
import useRwd from "../../../hook/useRwd";
import Cube from "../../cube3d";
import { LoginResponse } from "./type";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const inProgress = false;
  const { executeRecaptcha } = useGoogleReCaptcha();
  const navigate = useNavigate();
  const { isMobile } = useRwd();
  const { sendRequest: loginRequest, sendRequest: recaptchaRequest } =
    useAxios();
  const { auth, saveAuth } = useAuth();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("LOGIN");

    return token;
    // Do whatever you want with the token
  }, [executeRecaptcha]);
  if (auth) return <Navigate to={"/auth/upload"} />;
  return (
    <div className={`login ${isMobile ? "mobile" : ""}`}>
      <div className="login-content">
        <div className="login-content-body-wrapper">
          <div className="login-content-body">
            {inProgress ? (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h1>工作中</h1>
                <FontAwesomeIcon
                  icon={faWrench}
                  style={{ fontSize: "2.8rem" }}
                />
              </div>
            ) : (
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors: Partial<{
                    email: string;
                    password: string;
                  }> = {};
                  if (values.email === "") errors.email = "Email is required";
                  if (values.password === "")
                    errors.password = "Password is required";
                  return errors;
                }}
                onSubmit={async (values, errors) => {
                  const token = await handleReCaptchaVerify();
                  recaptchaRequest(
                    {
                      url: api.recaptcha.url(),
                      method: api.recaptcha.method,
                      data: {
                        secret: import.meta.env.VITE_RECAPTCHA_SECRET_KEY,
                        response: token,
                      },
                    },
                    (response: AxiosResponse<{ success: boolean }>) => {
                      const { data } = response;
                      if (data.success) {
                        loginRequest(
                          {
                            url: api.login.url(),
                            method: api.login.method,
                            data: {
                              email: values.email,
                              password: values.password,
                            },
                          },
                          (response: AxiosResponse<LoginResponse>) => {
                            const { data } = response;
                            saveAuth(data.data.token);
                            navigate("/auth/profile");
                          },
                          (error) => {
                            error.response?.status === 401 &&
                              errors.setErrors({
                                password: "Wrong password or username",
                                email: "Wrong password or username",
                              });
                          }
                        );
                      }
                    }
                  );
                }}
              >
                {({ handleSubmit, setFieldValue, errors }) => (
                  <form
                    className="login-content-body-form"
                    onSubmit={handleSubmit}
                  >
                    <h2>Login</h2>
                    <div className="login-content-body-input">
                      <input
                        type="text"
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                        }}
                      />
                      <span>Username</span>
                      <p className="login-content-body-input-error">
                        {errors.email}
                      </p>
                    </div>
                    <div className="login-content-body-input">
                      <input
                        type="password"
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                        }}
                      />
                      <span>Password</span>
                      <p className="login-content-body-input-error">
                        {errors.password}
                      </p>
                    </div>
                    <div
                      className="login-content-body-register"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      register
                    </div>
                    <button type="submit" className="login-content-body-button">
                      Login
                    </button>
                  </form>
                )}
              </Formik>
            )}
          </div>
          <div className="login-content-cube">
            <Cube />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
