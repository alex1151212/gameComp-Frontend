import { FC } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./components/pages/Home";
import Games from "./components/pages/Games";
import Sponsors from "./components/pages/Sponsors";
import Rules from "./components/pages/Rules";
import Agenda from "./components/pages/Agenda";
import Info from "./components/pages/Info";
import Login from "./components/pages/Login";
import AuthLayout from "./components/layout/AuthLayout";
import Logout from "./components/pages/Logout";
import Register from "./components/pages/Register";
import Upload from "./components/pages/Upload";
import Posts from "./components/pages/Post/Posts";
import PostDetail from "./components/pages/Post/PostDetail";
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
            <Route path="/auth/upload" element={<Upload />} />
            <Route path="/auth/logout" element={<Logout />} />
          </Route>

          <Route index path="/" element={<Navigate to={"/home"} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export { AppRoutes };
