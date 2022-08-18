import { useContext, useEffect, useState } from 'react';
import { Search, SearchResultData } from 'widgets/Search';
import { ResultImage } from 'widgets/Search/styled';
import { WidgetMakerContext } from '../context';
import { HighlightsWidgetConfig, TwitterWidgetConfig } from '../context/types';
import { SearchResultWrapper, SearchWrapper, UserInfoWrapper, Wrapper } from './styled';

// TODO: Unify with TwitterConfigurator, since they are so similar
export const HighlightsConfigurator: React.FC<{}> = () => {
  const [selected, setSelected] = useState<SearchResultData|null>(null);
  const onSelect = (result: SearchResultData) => {
    setSelected(result);
  };
  const { actions } = useContext(WidgetMakerContext);

  useEffect(() => {
    if (!selected) return;
    const updatedConfig: HighlightsWidgetConfig = {
      playerKey: selected?.key,
    };
    actions.updateHighlightsConfig(updatedConfig);
  }, [selected]);

  return (
    <Wrapper>
      <SearchWrapper>
        <div>Search for a player:</div>
        <Search size={'12px'} hasHighlights={true} onSelect={onSelect} />
      </SearchWrapper>
      {
        selected && (
          <SearchResultWrapper>
            <ResultImage src={selected.imgUrl} />
            <UserInfoWrapper>
              <div>{`${selected.firstName} ${selected.lastName}`}</div>
              <div>{`${selected.highlights.length} highlights`}</div>
            </UserInfoWrapper>
          </SearchResultWrapper>
        )
      }
    </Wrapper>
  )
}