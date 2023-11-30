import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../../../api";
import useAuth from "../../../hook/auth/useAuth";
import useAxios from "../../../hook/useAxios";
import useRwd from "../../../hook/useRwd";
import Cube from "../../cube3d";
import { LoginResponse } from "./type";
import ReCAPTCHA from "react-google-recaptcha";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const inProgress = false;
  const navigate = useNavigate();
  const { isMobile } = useRwd();
  const { sendRequest: loginRequest } = useAxios();
  const { auth, saveAuth } = useAuth();
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  if (auth) return <Navigate to={"/auth/profile"} />;

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
                  const token =
                    recaptchaRef.current && recaptchaRef.current.getValue();

                  loginRequest(
                    {
                      url: api.login.url(),
                      method: api.login.method,
                      data: {
                        email: values.email,
                        password: values.password,
                      },
                      headers: {
                        CaptchaResponse: token,
                      },
                    },
                    (response: AxiosResponse<LoginResponse>) => {
                      const { data } = response;
                      toast.success("登入成功", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });

                      saveAuth(data.data.token);
                      navigate("/auth/profile");
                    },
                    (error) => {
                      error.response?.status === 401 &&
                        errors.setErrors({
                          password: "Wrong email or password",
                          email: "Wrong email or password",
                        });
                      toast.error("登入失敗", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
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
                      <span>Email</span>
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
                    <div className="captcha">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      />
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
      <ToastContainer />
    </div>
  );
};
export default Login;
