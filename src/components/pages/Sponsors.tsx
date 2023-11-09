import React, { useEffect, useState } from "react";
import SponsorCard from "../sponsor-card";
import { SponsorCardTier, SponsorType } from "../sponsor-card/type";
interface SponsorsProps {}

const Sponsors: React.FC<SponsorsProps> = () => {
  const [sponsors, setSponsors] = useState<SponsorType[]>([]); // [games, setGames
  const getSponsorInfo = async () => {
    const response = await fetch("assets/data/sponsorInfo.json");
    const games = await response.json();
    return games;
  };

  useEffect(() => {
    getSponsorInfo().then((sponsors) => {
      setSponsors(sponsors);
    });
  }, []);

  return (
    <div className="sponsors">
      <div className="sponsors-content">
        <h1>贊助商</h1>
        <div className="sponsors-content-card-wrapper">
          {sponsors.map((sponsor) => (
            <SponsorCard
              color={sponsor.color}
              tier={sponsor.tier as SponsorCardTier}
              image={sponsor.image}
              title={sponsor.title}
              content={sponsor.content}
              link={sponsor.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sponsors;
