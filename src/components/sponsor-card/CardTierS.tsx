import React from "react";
import { SponsorCardBaseProps } from "./type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
export interface CardTierSProps extends SponsorCardBaseProps {
  color: string;
}

const CardTierS: React.FC<CardTierSProps> = ({
  textFamily,
  color,
  image,
  title,
  content,
  link,
  tier,
  textSize,
}) => {
  return (
    <div
      className={`sponsor-card-tier-s ${tier}`}
      style={{ "--clr": color } as React.CSSProperties}
    >
      <div className="mask"></div>
      <div className="sponsor-card-tier-s-content">
        <h3 style={{ fontFamily: textFamily }}>{title}</h3>
        <p style={{ fontSize: textSize }}>{content}</p>
        <a href={link} target="_blank">
          <FontAwesomeIcon icon={faLink} />
        </a>
      </div>
      <div className="sponsor-card-tier-s-imgbox">
        <img src={image} alt="" />
      </div>
      <div className="sponsor-card-tier-s-textbox">
        <h3 style={{ fontFamily: textFamily }}>{title}</h3>
      </div>
    </div>
  );
};
export default CardTierS;
