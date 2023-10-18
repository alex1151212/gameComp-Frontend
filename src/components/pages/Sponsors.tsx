import React from "react";
import SponsorCard from "../sponsor-card";
interface SponsorsProps {}

const Sponsors: React.FC<SponsorsProps> = () => {
  return (
    <div className="sponsors">
      <div className="sponsors-content">
        <SponsorCard color="#ffff00" />
        <SponsorCard color="#0000ff" />
        <SponsorCard color="#ffff00" />
        <SponsorCard color="#0000ff" />
        <SponsorCard color="#ffff00" />
        <SponsorCard color="#0000ff" />
        <SponsorCard color="#ffff00" />
      </div>
    </div>
  );
};
export default Sponsors;
