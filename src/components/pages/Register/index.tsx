import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React from "react";
import { api } from "../../../api";
import useAuth from "../../../hook/auth/useAuth";
import useAxios from "../../../hook/useAxios";
import useRwd from "../../../hook/useRwd";
import Cube from "../../cube3d";
import { RegisterResponse } from "./type";
import { Navigate, useNavigate } from "react-router-dom";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  // const { executeRecaptcha } = useGoogleReCaptcha();
  const navigate = useNavigate();
  const { isMobile } = useRwd();
  const { sendRequest: registerRequest } = useAxios();
  const { auth, saveAuth } = useAuth();

  // const handleReCaptchaVerify = useCallback(async () => {
  //   if (!executeRecaptcha) {
  //     console.log("Execute recaptcha not yet available");
  //     return;
  //   }

  //   const token = await executeRecaptcha("LOGIN");

  //   return token;
  //   // Do whatever you want with the token
  // }, [executeRecaptcha]);
  if (auth) return <Navigate to={"/auth/upload"} />;
  return (
    <div className={`login ${isMobile && "mobile"}`}>
      <div className="login-content">
        <div className="login-content-body-wrapper">
          <div className="login-content-body">
            <Formik
              initialValues={{
                email: "",
                password: "",
                username: "",
                confirmPassword: "",
              }}
              validate={(values) => {
                const errors: Partial<{
                  email: string;
                  password: string;
                  username: string;
                  confirmPassword: string;
                }> = {};
                if (!(values.password === values.confirmPassword)) {
                  errors.password = "Password not match";
                  errors.confirmPassword = "Password not match";
                }

                return errors;
              }}
              onSubmit={async (values) => {
                // const token = await handleReCaptchaVerify();
                // await axios
                //   .post(import.meta.env.VITE_RECAPTCHA_VERIFY, {
                //     secret: import.meta.env.VITE_RECAPTCHA_KEY,
                //     response: token,
                //   })
                //   .then((res) => {
                //     console.log(res);
                //   });
                registerRequest(
                  {
                    url: api.login.url(),
                    method: api.login.method,
                    data: {
                      email: values.email,
                      username: values.username,
                      password: values.password,
                    },
                  },
                  (response: AxiosResponse<RegisterResponse>) => {
                    const { data } = response;
                    saveAuth(data.data.token);
                    navigate("/auth/upload");
                  }
                );
              }}
            >
              {({ handleSubmit, setFieldValue }) => (
                <form
                  className="login-content-body-form"
                  onSubmit={handleSubmit}
                >
                  <h2>Register</h2>
                  <div className="login-content-body-input">
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setFieldValue("email", e.target.value);
                      }}
                    />
                    <span>Email</span>
                  </div>
                  <div className="login-content-body-input">
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setFieldValue("username", e.target.value);
                      }}
                    />
                    <span>Username</span>
                  </div>
                  <div className="login-content-body-input">
                    <input
                      type="password"
                      required
                      onChange={(e) => {
                        setFieldValue("password", e.target.value);
                      }}
                    />
                    <span>Password</span>
                  </div>
                  <div className="login-content-body-input">
                    <input
                      type="password"
                      required
                      onChange={(e) => {
                        setFieldValue("confirmPassword", e.target.value);
                      }}
                    />
                    <span>Confirm Password</span>
                  </div>
                  <button type="submit" className="login-content-body-button">
                    Comfirm
                  </button>
                </form>
              )}
            </Formik>
          </div>
          <div className="login-content-cube">
            <Cube />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
