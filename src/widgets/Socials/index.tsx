import { Highlights } from "../../features/player/components/Highlights";
import { SectionHeader, SectionSubheader } from "../../features/player/styled"
import { SectionInnerWrapper, SectionWrapper } from "../../shared-components/SectionWrapper"
import { Twitter } from "./Twitter";

interface SocialsProps {
  playerKey: string;
  twitter?: string;
  instagram?: string;
}

export const Socials: React.FC<SocialsProps> = ({ playerKey, twitter, instagram }) => {
  return (
    <SectionWrapper>
      <SectionHeader>{'SOCIAL'}</SectionHeader>
      {
        twitter && (
          <SectionInnerWrapper>
            <SectionSubheader>Twitter</SectionSubheader>
            <Twitter key={twitter} username={twitter} />
          </SectionInnerWrapper>
        )
      }
      <Highlights playerKey={playerKey} />
    </SectionWrapper>
  )
}
