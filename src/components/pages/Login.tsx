import React from "react";
import useRwd from "../../hook/useRwd";
import Cube from "../cube3d";
import { Formik } from "formik";
interface HomeProps {}

const Login: React.FC<HomeProps> = () => {
  const { isMobile } = useRwd();

  return (
    <div className={`login ${isMobile && "mobile"}`}>
      <div className="login-content">
        <div className="login-content-body-wrapper">
          <div className="login-content-body">
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ handleSubmit, setFieldValue }) => (
                <form
                  className="login-content-body-form"
                  onSubmit={handleSubmit}
                >
                  <h2>Login</h2>
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
                  <button type="submit" className="login-content-body-button">
                    Login
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
export default Login;
