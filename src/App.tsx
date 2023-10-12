import { Outlet } from "react-router-dom";
import "./style/App.css";
import AsideMenu from "./components/layout/AsideMenu";

function App() {
  return (
    <div className="layout">
      <AsideMenu />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
