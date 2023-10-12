import React from "react";
import Logo from "../../assets/images/logo.png";
import Logo2x from "../../assets/images/logo@2x.png";
import Logo3x from "../../assets/images/logo@3x.png";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <div className="home-logo">
        <img
          src={Logo}
          alt=""
          srcSet={`${Logo2x} 2x,
          ${Logo3x} 3x`}
        />
      </div>
      <div className="home-content">
        <div className="text">創意遊戲設計大賽</div>
        <div className="text">總獎金</div>
        <div className="money">$200,000</div>
      </div>
    </div>
  );
};
export default Home;
