import React from "react";
import InfoCard from "../Info-card";
import { IoCloudDownloadSharp } from "react-icons/io5";
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
                  target="_blank"
                  style={{
                    fontSize: "42px",
                  }}
                >
                  <IoCloudDownloadSharp
                    style={{
                      color: "#00f",
                    }}
                  />
                </a>
              </div>
            }
          />
          <InfoCard
            title={"創意遊戲設計競賽(贊助企劃書)"}
            content={
              <div>
                <p>112臺灣大專院校創意遊戲設計競賽(贊助企劃書)</p>
                <a
                  href="assets/files/112臺灣大專院校創意遊戲設計競賽_贊助企劃書.pdf"
                  target="_blank"
                  style={{
                    fontSize: "42px",
                  }}
                >
                  <IoCloudDownloadSharp
                    style={{
                      color: "#00f",
                    }}
                  />
                </a>
              </div>
            }
          />
          <InfoCard
            title={"創意遊戲設計競賽(活動企劃書)"}
            content={
              <div>
                <p>112臺灣大專院校創意遊戲設計競賽(活動企劃書)</p>
                <a
                  href="assets/files/112臺灣大專院校創意遊戲設計競賽_活動企劃書.pdf"
                  target="_blank"
                  style={{
                    fontSize: "42px",
                  }}
                >
                  <IoCloudDownloadSharp
                    style={{
                      color: "#00f",
                    }}
                  />
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
