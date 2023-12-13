import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";
import NavBarMenu from "./components/layout/NavBarMenu";
import NavBarMobileMenu from "./components/layout/NavBarMobileMenu";
import useRwd from "./hook/useRwd";
import router from "./routers";
import "./style/App.css";

function App() {
  const { isMobile } = useRwd();

  const location = useLocation();

  // function matchPath(path: string): { name: string; path: string } | null {
  //   const pattern = /^\/posts\/detail\/(\d+)$/;
  //   const match = path.match(pattern);
  //   if (match) {
  //     const name = match[1];
  //     return { name, path };
  //   }
  //   return null;
  // }

  return (
    <div className="layout">
      {isMobile ? <NavBarMobileMenu /> : <NavBarMenu />}

      <div className={`content ${isMobile ? "mobile" : ""}`}>
        <div className={`content-body ${isMobile ? "mobile" : ""}`}>
          {isMobile && (
            <div className="content-body-mobile-logo-wrapper">
              <div className="content-body-mobile-logo">
                <div>I</div>
                <div className="yellow">G</div>
                <div>D</div>
              </div>

              <div className="content-body-mobile-logo-path">
                {router.find((route) => route.path === location.pathname)?.name}
              </div>
            </div>
          )}
          <div className="content-page">
            <Outlet />
          </div>
        </div>

        <div className={`content-footer ${isMobile ? "mobile" : ""}`}>
          <div className="content-footer-border">
            <div className="dot"></div>
            <div className="line"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
      <div className={`footer ${isMobile ? "mobile" : ""}`}>
        {isMobile && (
          <div className="footer-border">
            <div className="dot"></div>
            <div className="line"></div>
            <div className="dot"></div>
          </div>
        )}

        <div className="footer-content">
          <div>
            <p>112 臺灣大專院校創意遊戲設計競賽 </p>
            <div className="footer-logo">
              <p>Innovation</p>
              <div>
                <span className="footer-logo-yello">
                  <p>Game</p>
                </span>
                <span>
                  <p>Design</p>
                </span>
              </div>
            </div>
            <div className="footer-society">
              <a
                href="https://www.facebook.com/profile.php?id=61552178682390"
                target="_blank"
                style={{ color: "rgb(24,119,242)" }}
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://www.instagram.com/igd.gamelab/"
                target="_blank"
                style={{ color: "#833ab4" }}
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div>
            <table style={{ textAlign: "start" }}>
              <tbody>
                <tr>
                  <td>主辦單位：臺灣科技大學數位娛樂科技研究中心</td>
                  <td></td>
                </tr>
                <tr>
                  <td>協辦單位：鈊象電子股份有限公司</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="footer-border">
          <div className="dot"></div>
          <div className="line"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
