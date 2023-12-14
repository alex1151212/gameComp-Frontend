export interface SponsorCardBaseProps {
  textSize?: string;
  textFamily?: string;
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
  textFamily?: string;
};
export type SponsorCardTier = "SS" | "S" | "A" | "B" | "C";
