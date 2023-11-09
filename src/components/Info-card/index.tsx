import React from "react";
import DocumentIcon from "../../assets/images/svg/document-icon";

interface Props {
  title: string;
  content: React.ReactNode;
}

export const InfoCard: React.FC<Props> = ({ title, content }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <div className={`info-card ${isOpen ? "active" : ""}`}>
      <div className="info-card-icon">
        <DocumentIcon />
      </div>
      <div className="info-card-content">
        <h3>{title}</h3>
        <p>{content}</p>
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
