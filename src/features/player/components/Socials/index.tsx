import { Highlights } from '../Highlights';
import {
  SectionHeader,
  SectionSubheader,
  SectionInnerWrapper,
  SectionWrapper
} from '../../../../shared-components/page';
import { HighlightsWrapper, TwitterWrapper, Wrapper } from './styled';
import { Twitter } from '../../../../widgets/Twitter';

interface SocialsProps {
  playerKey: string;
  twitter?: string;
  instagram?: string;
}

export const Socials: React.FC<SocialsProps> = ({ playerKey, twitter, instagram }) => {
  return (
    <SectionWrapper>
      <a id='social'/>
      <SectionHeader>{'SOCIAL'}</SectionHeader>
      <Wrapper>
      {
        twitter && (
          <TwitterWrapper>
            <SectionInnerWrapper>
              <SectionSubheader>Twitter</SectionSubheader>
              <Twitter key={twitter} username={twitter} />
            </SectionInnerWrapper>
          </TwitterWrapper>
        )
      }
      <HighlightsWrapper>
        <Highlights playerKey={playerKey} />
      </HighlightsWrapper>
      </Wrapper>
    </SectionWrapper>
  )
}
