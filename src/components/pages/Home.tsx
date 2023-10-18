import React from "react";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <div className="home-logo">
        <p>Innovation</p>
        <div>
          <span className="home-logo-yello">
            <p>Game</p>
          </span>
          <span>
            <p>Design</p>
          </span>
        </div>
      </div>
      <div className="home-content">
        <div className="money">
          <p>$200,000</p>
        </div>
        <div className="text">總獎金</div>
      </div>
    </div>
  );
};
export default Home;
