import React from "react";
import Logo from "../../assets/images/logo.png";
import Logo2x from "../../assets/images/logo@2x.png";
import Logo3x from "../../assets/images/logo@3x.png";
import { useNavigate } from "react-router-dom";

interface AsideMenuProps {}

const navbar = [
  {
    path: "/",
    name: "home",
  },
  {
    path: "/games",
    name: "games",
  },
  {
    path: "/rules",
    name: "rules",
  },
  {
    path: "/agenda",
    name: "agenda",
  },
  {
    path: "/login",
    name: "login",
  },
];

const AsideMenu: React.FC<AsideMenuProps> = () => {
  const navigate = useNavigate();
  const linkHandler = (path: string) => {
    navigate(path);
  };

  return (
    <div className="aside-menu">
      <div className="aside-menu-logo">
        <img
          src={Logo}
          alt=""
          srcSet={`${Logo2x} 2x,
          ${Logo3x} 3x`}
        />
      </div>
      <ul className="aside-menu-nav">
        {navbar.map((item) => (
          <li className="aside-menu-nav-item" key={item.path}>
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
    </div>
  );
};
export default AsideMenu;
