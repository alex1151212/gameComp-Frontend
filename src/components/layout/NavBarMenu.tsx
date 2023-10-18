import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavBarMenuProps {}

const navbar = [
  {
    path: "/home",
    name: "HOME",
  },
  {
    path: "/games",
    name: "GAMES",
  },
  {
    path: "/rules",
    name: "RULES",
  },
  {
    path: "/agenda",
    name: "AGENDA",
  },
  {
    path: "/sponsors",
    name: "SPONSORS",
  },
  {
    path: "/login",
    name: "LOGIN",
  },
];

const NavBarMenu: React.FC<NavBarMenuProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const linkHandler = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    console.log("/home" == location.pathname);
  }, [location]);

  return (
    <div className="navbar-menu">
      <ul className="navbar-menu-nav">
        {navbar.map((item) => (
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
      <div className="navbar-menu-nav-line"></div>
    </div>
  );
};
export default NavBarMenu;
