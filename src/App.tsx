import { Outlet } from "react-router-dom";
import "./style/App.css";
import NavBarMenu from "./components/layout/NavBarMenu";

function App() {
  return (
    <div className="layout">
      <NavBarMenu />
      <div className="content">
        <div className="content-body">
          <Outlet />
        </div>
        <div className="content-footer">
          <div className="content-footer-dot"></div>
          <div className="content-footer-line"></div>
          <div className="content-footer-dot"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
