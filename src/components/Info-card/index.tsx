import React from "react";
import DocumentIcon from "../../assets/images/svg/document-icon";

interface Props {
  title: string;
  content: React.ReactNode;
}

export const InfoCard: React.FC<Props> = ({ title, content }) => {
  // const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <div className={`info-card`}>
      <div className="info-card-content">
        <div className="info-card-content-icon">
          <DocumentIcon />
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
      {/* <div
        className={`info-card-content-more`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      ></div> */}
      <svg>
        <filter id="wavy">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.02"
            numOctaves="5"
            seed={2}
          >
            <animate
              attributeName="baseFrequency"
              dur="60s"
              values="0.02;0.05;0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30" />
        </filter>
      </svg>
    </div>
  );
};

export default InfoCard;
