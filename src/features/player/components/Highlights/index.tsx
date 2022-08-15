import { SectionSubheader } from '../../../../shared-components/page';
import { SectionInnerWrapper } from '../../../../shared-components/page';
import { Highlights as HighlightsWidget } from '../../../../widgets/Highlights';

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
