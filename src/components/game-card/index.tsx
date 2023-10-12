import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

interface GameCardProps {
  name: string;
  reward?: string;
  pdfLink: string;
  youtubeLink: string;
}

const GameCard: React.FC<GameCardProps> = ({
  name,
  reward,
  pdfLink,
  youtubeLink,
}) => {
  return (
    <div className="game-card">
      <div className="game-card-content">
        <p>{name}</p>
        <p>{reward}</p>
        <div className="game-card-content-icon-wrapper">
          <a href={pdfLink}>
            <FontAwesomeIcon icon={faLink} />
          </a>
          <a href={youtubeLink}>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
    </div>
  );
};
export default GameCard;
