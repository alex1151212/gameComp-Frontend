import React from "react";
import InfoCard from "../Info-card";
interface InfoProps {}

const Info: React.FC<InfoProps> = () => {
  return (
    <div className="info">
      <div className="info-content">
        <h1>相關資訊</h1>
        <div className="info-content-card-wrapper">
          <InfoCard />
          <InfoCard />
          <InfoCard />
          <InfoCard />
          <InfoCard />
          <InfoCard />
          <InfoCard />
          <InfoCard />
          <InfoCard />
          <InfoCard />
        </div>
      </div>
    </div>
  );
};
export default Info;
