import React from "react";
import DocumentIcon from "../../assets/images/svg/document-icon";

interface Props {}

export const InfoCard: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <div className={`info-card ${isOpen ? "active" : ""}`}>
      <div className="info-card-icon">
        <DocumentIcon />
      </div>
      <div className="info-card-content">
        <h3>Web & Mobile Development</h3>
        <p>
          Content Content Content Content Content Content Content Content
          Content Content Content Content Content
        </p>
      </div>
      <div
        className={`info-card-content-more`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      ></div>
    </div>
  );
};

export default InfoCard;
