import { Highlights } from '../Highlights';
import {
  SectionHeader,
  SectionSubheader,
  SectionInnerWrapper,
  SectionWrapper
} from 'shared-components/Page/styled';
import { HighlightsScrollWrapper, FeedScrollWrapper, Wrapper, HighlightsContainer } from './styled';
import { Twitter } from 'widgets/Twitter';
import { useEffect, useState } from 'react';
import { Sneakers } from 'widgets/Sneakers';

interface SocialsProps {
  playerKey: string;
  sneakerTokens?: string[];
  twitter?: string;
  instagram?: string;
}

export const Socials: React.FC<SocialsProps> = ({ playerKey, twitter, instagram, sneakerTokens }) => {
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
          <SectionInnerWrapper>
            <SectionSubheader>Twitter</SectionSubheader>
            <FeedScrollWrapper>
              <Twitter key={twitter} username={twitter} />
            </FeedScrollWrapper>
          </SectionInnerWrapper>
        )
      }
      {
        readyForIframes && (
          <HighlightsContainer>
            <SectionInnerWrapper>
              <SectionSubheader>Highlights</SectionSubheader>
              <HighlightsScrollWrapper>
                <Highlights playerKey={playerKey} />
              </HighlightsScrollWrapper>
            </SectionInnerWrapper>
          </HighlightsContainer>
        )
      }
      {
        sneakerTokens && (
          <SectionInnerWrapper>
            <SectionSubheader>Sneakers</SectionSubheader>
            <FeedScrollWrapper>
              <Sneakers sneakerTokens={sneakerTokens}/>
            </FeedScrollWrapper>
          </SectionInnerWrapper>
        )
      }
      
      </Wrapper>
    </SectionWrapper>
  )
}
