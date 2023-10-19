import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style/App.css";
import NavBarMenu from "./components/layout/NavBarMenu";
import useRwd from "./hook/useRwd";
import MenuIcon from "./assets/images/svg/menu-icon";
import router from "./routers";
import { useState } from "react";

function App() {
  const { isMobile } = useRwd();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const linkHandler = (path: string) => {
    navigate(path);
  };

  return (
    <div className="layout">
      {isMobile ? (
        <div className="navbar-menu-mobile">
          <div
            className="navbar-menu-mobile-menu-icon"
            onClick={() => {
              setIsMobileMenuOpen(true);
            }}
          >
            {isMobileMenuOpen || <MenuIcon />}
          </div>
          <div
            className={`navbar-menu-nav-mobile ${isMobileMenuOpen || "close"}`}
          >
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
            className={`navbar-menu-nav-mobile-mask ${
              isMobileMenuOpen || "close"
            }`}
          ></div>
        </div>
      ) : (
        <NavBarMenu />
      )}

      <div className={`content ${isMobile ? "mobile" : ""}`}>
        <div className={`content-body ${isMobile ? "mobile" : ""}`}>
          {isMobile && (
            <div className="content-body-mobile-logo">
              <p>Innovation</p>
              <p className="yellow">Game</p>
              <p>Design</p>
              <div className="content-body-mobile-logo-path">
                {router.find((route) => route.path === location.pathname)?.name}
              </div>
            </div>
          )}

          <Outlet />
        </div>

        <div className={`content-footer ${isMobile ? "mobile" : ""}`}>
          <div className="content-footer-dot"></div>
          <div className="content-footer-line"></div>
          <div className="content-footer-dot"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
