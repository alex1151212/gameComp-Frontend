import React from "react";
interface SponsorCardProps {
  color: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ color }) => {
  return (
    <div
      className="sponsor-card"
      style={{ "--clr": color } as React.CSSProperties}
    >
      <div className="sponsor-card-content">
        <h3>Design</h3>
        <p>Hello this is the content of the card</p>
      </div>
      <div className="sponsor-card-imgbox"></div>
      <div className="sponsor-card-textbox">
        <h3>Design</h3>
      </div>
    </div>
  );
};
export default SponsorCard;
