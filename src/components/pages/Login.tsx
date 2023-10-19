import React from "react";
import Cube from "../cube3d";
interface HomeProps {}

const Login: React.FC<HomeProps> = () => {
  return (
    <div className="login">
      <div className="login-content">
        <div className="login-content-body-wrapper">
          <div className="login-content-body">
            <div className="login-content-body-display">
              <h2>Login</h2>
              <h1>施工中</h1>
            </div>
            <div className="abc"></div>
            {/*  <div className="login-content-body-input">
            <div className="login-content-body-input-item">
              <label htmlFor="username"></label>
              <input type="text" name="username" />
            </div>
            <div className="login-content-body-input-item">
              <label htmlFor="password"></label>
              <input type="password" name="password" />
            </div>
          </div> */}
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
