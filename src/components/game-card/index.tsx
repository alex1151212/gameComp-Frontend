import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

interface GameCardProps {
  name: string;
  imgLink: string;
  reward?: string;
  pdfLink?: string;
  youtubeLink: string;
}

const GameCard: React.FC<GameCardProps> = ({
  name,
  reward,
  imgLink,
  pdfLink,
  youtubeLink,
}) => {
  useEffect(() => {
    console.log(pdfLink);
  }, []);
  return (
    <div className="game-card">
      <div className="game-card-image">
        <img src={`assets/images/game/${imgLink}`} alt="" />
      </div>
      <div className="game-card-content">
        <h2>{name}</h2>
        <h2>{reward}</h2>
        <div className="game-card-content-icon-wrapper">
          {pdfLink && (
            <a href={pdfLink} target="_blank">
              <FontAwesomeIcon icon={faLink} />
            </a>
          )}
          {youtubeLink && (
            <a href={youtubeLink} target="_blank">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default GameCard;
