import React from "react";

interface Props {}

const LivePage: React.FC<Props> = () => {
  return (
    <div className="live">
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
  );
};

export default LivePage;
