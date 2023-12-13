import React from "react";
import CardTierS from "./CardTierS";
import { SponsorCardBaseProps, SponsorCardTier } from "./type";
import CardTierA from "./CardTierA";
interface SponsorCardProps extends SponsorCardBaseProps {
  tier: SponsorCardTier;
}

const SponsorCard: React.FC<SponsorCardProps> = ({
  color,
  tier,
  image,
  title,
  content,
  link,
  textSize,
}) => {
  const tierhandler = (
    tier: SponsorCardTier,
    image: string,
    title: string,
    content: string
  ) => {
    switch (tier) {
      case "SS":
        return (
          <CardTierS
            textSize={textSize}
            tier={tier}
            color={color}
            image={image}
            title={title}
            content={content}
            link={link}
          />
        );
      case "S":
        return (
          <CardTierS
            textSize={textSize}
            tier={tier}
            color={color}
            image={image}
            title={title}
            content={content}
            link={link}
          />
        );
      case "A":
        return (
          <CardTierS
            textSize={textSize}
            tier={tier}
            color={color}
            image={image}
            title={title}
            content={content}
            link={link}
          />
        );
      case "B":
        return (
          <CardTierS
            textSize={textSize}
            tier={tier}
            color={color}
            image={image}
            title={title}
            content={content}
            link={link}
          />
        );
      case "C":
        return (
          <CardTierA
            textSize={textSize}
            tier={tier}
            color={color}
            image={image}
            title={title}
            content={content}
            link={link}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="sponsor-card">
      {tierhandler(tier, `assets/images/sponsor/${image}`, title, content)}
    </div>
  );
};
export default SponsorCard;
