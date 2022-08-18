import { Highlights } from '../Highlights';
import {
  SectionHeader,
  SectionSubheader,
  SectionInnerWrapper,
  SectionWrapper
} from 'shared-components/Page/styled';
import { HighlightsWrapper, TwitterWrapper, Wrapper } from './styled';
import { Twitter } from 'widgets/Twitter';
import { useEffect, useState } from 'react';

interface SocialsProps {
  playerKey: string;
  twitter?: string;
  instagram?: string;
}

export const Socials: React.FC<SocialsProps> = ({ playerKey, twitter, instagram }) => {
  const [readyForIframes, setReadyForIframes] = useState(false);

  useEffect(() => {
    setReadyForIframes(true);
  }, []);

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
      {
        readyForIframes && 
        <HighlightsWrapper>
          <Highlights playerKey={playerKey} />
        </HighlightsWrapper>
      }
      
      </Wrapper>
    </SectionWrapper>
  )
}
