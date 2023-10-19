import React, { CSSProperties } from "react";
interface CubeProps {}

const Cube: React.FC<CubeProps> = () => {
  return (
    <div className="cube">
      <div className="top"></div>
      <div>
        <span style={{ "--i": "0" } as CSSProperties}>
          <div className="cube-logo">
            <p>Innovation</p>
            <p className="yellow">Game</p>
            <p>Design</p>
          </div>
          <div className="cube-logo">
            <p>Innovation</p>
            <p className="yellow">Game</p>
            <p>Design</p>
          </div>
        </span>
        <span style={{ "--i": "1" } as CSSProperties}>
          <div className="cube-logo">
            <p>Innovation</p>
            <p className="yellow">Game</p>
            <p>Design</p>
          </div>
          <div className="cube-logo">
            <p>Innovation</p>
            <p className="yellow">Game</p>
            <p>Design</p>
          </div>
        </span>
        <span style={{ "--i": "2" } as CSSProperties}>
          <div className="cube-logo">
            <p>Innovation</p>
            <p className="yellow">Game</p>
            <p>Design</p>
          </div>
          <div className="cube-logo">
            <p>Innovation</p>
            <p className="yellow">Game</p>
            <p>Design</p>
          </div>
        </span>
        <span style={{ "--i": "3" } as CSSProperties}>
          <div className="cube-logo">
            <p>Innovation</p>
            <p className="yellow">Game</p>
            <p>Design</p>
          </div>
          <div className="cube-logo">
            <p>Innovation</p>
            <p className="yellow">Game</p>
            <p>Design</p>
          </div>
        </span>
      </div>
    </div>
  );
};
export default Cube;
