import React from "react";
import { SponsorCardBaseProps } from "./type";
export interface CardTierAProps extends SponsorCardBaseProps {
  color: string;
}

const CardTierA: React.FC<CardTierAProps> = ({
  color,
  title,
  content,
  link,
  image,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      className="sponsor-card-tier-a"
      style={{ "--clr": color } as React.CSSProperties}
    >
      <div className="mask"></div>
      <div className="sponsor-card-tier-a-content">
        <h2 className="sponsor-card-tier-a-content-title">
          <div className="sponsor-card-tier-a-content-title-img">
            <img src={image} alt="" />
          </div>
          <p className="sponsor-card-tier-a-content-title-text">{title}</p>
        </h2>
        <p className="sponsor-card-tier-a-content-body">{content}</p>
        {/* <a href={link} target="_blank">
          <FontAwesomeIcon icon={faLink} />
        </a> */}
      </div>
    </a>
  );
};
export default CardTierA;
