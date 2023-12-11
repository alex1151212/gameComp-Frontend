export interface SponsorCardBaseProps {
  textSize?: string;
  color: string;
  image: string;
  title: string;
  content: string;
  link: string;
  tier: SponsorCardTier;
}

export type SponsorType = {
  link: string;
  image: string;
  title: string;
  content: string;
  tier: string;
  color: string;
  textSize?: string;
};
export type SponsorCardTier = "S" | "A" | "B" | "C";
