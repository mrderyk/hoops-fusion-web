import {useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PLAYER_SOCIALS } from '../../../lib/queries';
import { HighlightIFrame, HighlightsWrapper, HighlightWrapper } from './styled';

interface HighlightsProps {
  playerKey: string;
}

export const Highlights: React.FC<HighlightsProps> = ({ playerKey }) => {
  const [youtubeVideoIds, setYoutubeVideoIds] = useState<string[] | null>(null);
  const { loading } = useQuery(GET_PLAYER_SOCIALS, {
    fetchPolicy: 'network-only',
    variables: {
      key: playerKey,
    },
    onCompleted: (data: any) => {
      if (!data.getPlayerSocials.length) return;
      setYoutubeVideoIds(data.getPlayerSocials[0].youtubeVideoIds);
    }
  });

  return (
    <>
      <HighlightsWrapper>
      {
        youtubeVideoIds && youtubeVideoIds.map((id: string) => (
          <Highlight key={id} id={id} />
        ))
      }
      </HighlightsWrapper>
    </>
  );
};

interface HighlightProps {
  id: string;
}

const Highlight: React.FC<HighlightProps> = ({ id }) => {
  return (
    <HighlightWrapper>
      <HighlightIFrame
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen />
    </HighlightWrapper>
  )
};