import React from "react";
import InfoCard from "../Info-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
interface InfoProps {}

const Info: React.FC<InfoProps> = () => {
  return (
    <div className="info">
      <div className="info-content">
        <h1>相關資訊</h1>
        <div className="info-content-card-wrapper">
          <InfoCard
            title={"創意遊戲設計競賽規程（總則）"}
            content={
              <div>
                <p>112台灣大專院校創意遊戲設計競賽規程(總則)</p>
                <a
                  href="assets/files/112台灣大專院校創意遊戲設計競賽規程(總則).pdf"
                  style={{
                    color: "#00f",
                    fontSize: "42px",
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </a>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Info;
