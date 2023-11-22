import { FC } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import AuthLayout from "./components/layout/AuthLayout";
import Agenda from "./components/pages/Agenda";
import Games from "./components/pages/Games";
import Home from "./components/pages/Home";
import Info from "./components/pages/Info";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import PostDetail from "./components/pages/Post/PostDetail";
import Posts from "./components/pages/Post/Posts";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import Rules from "./components/pages/Rules";
import Sponsors from "./components/pages/Sponsors";
const { PUBLIC_URL } = import.meta.env;

const AppRoutes: FC = () => {
  return (
    <HashRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/info" element={<Info />} />
          <Route path="/post" element={<Info />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/detail/:postId" element={<PostDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/profile" element={<Profile />} />
            <Route path="/auth/logout" element={<Logout />} />
          </Route>

          <Route index path="/" element={<Navigate to={"/home"} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export { AppRoutes };

