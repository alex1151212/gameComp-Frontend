import React from "react";

interface Props {}

const LivePage: React.FC<Props> = () => {
  return (
    <div className="live">
      <div className="live-content">
        <h1>比賽直播紀錄</h1>
        <div>第一段</div>
        <div className="live-content-iframe-wrapper">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/O93eoaBQiPc?feature=share"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div>第二段</div>
        <div className="live-content-iframe-wrapper">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/xaiF-WFIZI8?feature=share"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
