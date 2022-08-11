import { SectionSubheader } from '../../styled';
import { SectionInnerWrapper } from '../../../../shared-components/SectionWrapper';
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
