import React from "react";
import CardTierS from "./CardTierS";
import { SponsorCardBaseProps, SponsorCardTier } from "./type";
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
}) => {
  const tierhandler = (
    tier: SponsorCardTier,
    image: string,
    title: string,
    content: string
  ) => {
    switch (tier) {
      case "S":
        return (
          <CardTierS
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
          //   <CardTierA
          //   tier=""
          //     color={color}
          //     image={image}
          //     title={title}
          //     content={content}
          //     link={link}
          //   />
          <CardTierS
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
