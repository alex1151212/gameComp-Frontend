import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import router from "../../routers";
import MenuIcon from "../../assets/images/svg/menu-icon";

interface NavBarMobileMenuProps {}

const NavBarMobileMenu: React.FC<NavBarMobileMenuProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const linkHandler = (path: string) => {
    navigate(path);
  };

  return (
    <div className="navbar-menu-mobile">
      <div
        className="navbar-menu-mobile-menu-icon"
        onClick={() => {
          setIsMobileMenuOpen(true);
        }}
      >
        {isMobileMenuOpen || <MenuIcon />}
      </div>
      <div className={`navbar-menu-nav-mobile ${isMobileMenuOpen || "close"}`}>
        <div
          className="navbar-menu-mobile-close-icon"
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
        >
          ×
        </div>
        <ul>
          {router.map((item) => (
            <li
              key={item.path}
              className={`navbar-menu-nav-mobile-item ${
                item.path == location.pathname ? "active" : ""
              }`}
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
      </div>
      <div
        className={`navbar-menu-nav-mobile-mask ${isMobileMenuOpen || "close"}`}
        onClick={() => {
          setIsMobileMenuOpen(false);
        }}
      ></div>
    </div>
  );
};
export default NavBarMobileMenu;
