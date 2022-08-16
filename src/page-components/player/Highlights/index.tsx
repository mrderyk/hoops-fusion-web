import { SectionSubheader, SectionInnerWrapper } from '../../../../src/shared-components/Page/styled';
import { Highlights as HighlightsWidget } from 'widgets/Highlights';

interface HighlightsProps {
  playerKey: string;
}

export const Highlights: React.FC<HighlightsProps> = ({ playerKey }) => {
  return (
    <>
      <SectionInnerWrapper>
        <SectionSubheader>Highlights</SectionSubheader>
        <HighlightsWidget playerKey={playerKey}/>
      </SectionInnerWrapper>
    </>
  );
};
