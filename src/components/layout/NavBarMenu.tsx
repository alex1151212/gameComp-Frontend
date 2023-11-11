import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import router from "../../routers";
import useAuth from "../../hook/auth/useAuth";

interface NavBarMenuProps {}

const NavBarMenu: React.FC<NavBarMenuProps> = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const linkHandler = (path: string) => {
    navigate(path);
  };

  return (
    <div className="navbar-menu">
      <ul className="navbar-menu-nav">
        {router
          .filter((router) => {
            if (auth && router.name == "login") return false;
            else if (
              !auth &&
              (router.name == "logout" || router.name == "upload")
            )
              return false;
            else if (router.visible) return false;
            else return true;
          })
          .map((item) => (
            <li
              className={`navbar-menu-nav-item ${
                item.path == location.pathname ? "active" : ""
              }`}
              key={item.path}
            >
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  linkHandler(item.path);
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
      </ul>

      {/* <div className="navbar-menu-nav-line"></div> */}
    </div>
  );
};
export default NavBarMenu;
