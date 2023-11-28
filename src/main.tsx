import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";

library.add(fas, faTwitter, faFontAwesome);

import { AppRoutes } from "./AppRouter.tsx";
import { AuthProvider } from "./hook/auth/useAuth.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        language="zh-TW"
      >
        <AppRoutes />
        <ToastContainer />
      </GoogleReCaptchaProvider>
    </AuthProvider>
  </React.StrictMode>
);
