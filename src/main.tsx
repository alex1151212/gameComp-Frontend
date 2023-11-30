import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFontAwesome, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas, faTwitter, faFontAwesome);

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./AppRouter.tsx";
import { AuthProvider } from "./hook/auth/useAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        language="zh-TW"
      > */}
      <AppRoutes />
      <ToastContainer />
      {/* </GoogleReCaptchaProvider> */}
    </AuthProvider>
  </React.StrictMode>
);
