import { FC } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/pages/Home";
import Games from "./components/pages/Games";
import Sponsors from "./components/pages/Sponsors";
import Rules from "./components/pages/Rules";
import Agenda from "./components/pages/Agenda";
import Login from "./components/pages/Login";
const { PUBLIC_URL } = import.meta.env;

const AppRoutes: FC = () => {
  return (
    <HashRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export { AppRoutes };
