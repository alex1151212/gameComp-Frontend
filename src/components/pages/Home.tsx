import React from "react";
import Logo from "../../assets/images/logo.png";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <div className="home-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="home-content">
        <div className="text">創意遊戲設計大賽</div>

        <div className="money">
          <p className="feed">$200,000</p>
        </div>
        <div className="text">總獎金</div>
      </div>
    </div>
  );
};
export default Home;
