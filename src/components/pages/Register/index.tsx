import { AxiosError, AxiosResponse } from "axios";
import { Formik } from "formik";
import React from "react";
import { api } from "../../../api";
import useAuth from "../../../hook/auth/useAuth";
import useAxios from "../../../hook/useAxios";
import useRwd from "../../../hook/useRwd";
import Cube from "../../cube3d";
import { RegisterResponse } from "./type";
import { Navigate, useNavigate } from "react-router-dom";
import { ICommonError } from "../../../api/axios";
import { toast } from "react-toastify";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const navigate = useNavigate();
  const { isMobile } = useRwd();
  const { sendRequest: registerRequest } = useAxios();
  const { auth, saveAuth } = useAuth();
  if (auth) return <Navigate to={"/auth/profile"} />;
  return (
    <div className={`register ${isMobile && "mobile"}`}>
      <div className="register-content">
        <div className="register-content-body-wrapper">
          <div className="register-content-body">
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
                if (values.email === "") errors.email = "Email is required";
                if (values.username === "")
                  errors.username = "Username is required";
                if (values.password === "")
                  errors.password = "Password is required";
                if (!(values.password === values.confirmPassword)) {
                  errors.confirmPassword = "Password not match";
                }

                return errors;
              }}
              onSubmit={async (values, errors) => {
                registerRequest(
                  {
                    url: api.register.url(),
                    method: api.register.method,
                    data: {
                      email: values.email,
                      username: values.username,
                      password: values.password,
                    },
                  },
                  (response: AxiosResponse<RegisterResponse>) => {
                    const { data } = response;
                    toast.success("註冊成功", {
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
                  (error: AxiosError) => {
                    const { response } = error;
                    toast.error("註冊失敗", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                    response &&
                      errors.setErrors({
                        confirmPassword:
                          (response.data as ICommonError).Msg ?? "",
                      });
                  }
                );
              }}
            >
              {({ handleSubmit, setFieldValue, errors }) => (
                <form
                  className="register-content-body-form"
                  onSubmit={handleSubmit}
                >
                  <h2>Register</h2>
                  <div className="register-content-body-input">
                    <input
                      type="text"
                      // required
                      onChange={(e) => {
                        setFieldValue("email", e.target.value);
                      }}
                    />
                    <span>Email</span>
                    <p className="register-content-body-input-error">
                      {errors.email}
                    </p>
                  </div>
                  <div className="register-content-body-input">
                    <input
                      type="text"
                      // required
                      onChange={(e) => {
                        setFieldValue("username", e.target.value);
                      }}
                    />
                    <span>Username</span>
                    <p className="register-content-body-input-error">
                      {errors.username}
                    </p>
                  </div>
                  <div className="register-content-body-input">
                    <input
                      type="password"
                      // required
                      onChange={(e) => {
                        setFieldValue("password", e.target.value);
                      }}
                    />
                    <span>Password</span>
                    <p className="register-content-body-input-error">
                      {errors.password}
                    </p>
                  </div>
                  <div className="register-content-body-input">
                    <input
                      type="password"
                      // required
                      onChange={(e) => {
                        setFieldValue("confirmPassword", e.target.value);
                      }}
                    />
                    <span>Confirm Password</span>
                    <p className="register-content-body-input-error">
                      {errors.confirmPassword}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="register-content-body-button"
                  >
                    Comfirm
                  </button>
                </form>
              )}
            </Formik>
          </div>
          <div className="register-content-cube">
            <Cube />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
