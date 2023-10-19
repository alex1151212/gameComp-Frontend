import { Outlet, useLocation } from "react-router-dom";
import NavBarMenu from "./components/layout/NavBarMenu";
import NavBarMobileMenu from "./components/layout/NavBarMobileMenu";
import useRwd from "./hook/useRwd";
import router from "./routers";
import "./style/App.css";

function App() {
  const { isMobile } = useRwd();

  const location = useLocation();

  return (
    <div className="layout">
      {isMobile ? <NavBarMobileMenu /> : <NavBarMenu />}

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
