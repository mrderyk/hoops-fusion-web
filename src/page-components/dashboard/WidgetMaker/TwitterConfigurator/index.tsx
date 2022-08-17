import { useContext, useEffect, useState } from 'react';
import { Search, SearchResultData } from 'widgets/Search';
import { ResultImage } from 'widgets/Search/styled';
import { WidgetMakerContext } from '../context';
import { TwitterWidgetConfig } from '../context/types';
import { SearchResultWrapper, SearchWrapper, UserInfoWrapper, Wrapper } from './styled';

export const TwitterConfigurator: React.FC<{}> = () => {
  const [selected, setSelected] = useState<SearchResultData|null>(null);
  const onSelect = (result: SearchResultData) => {
    setSelected(result);
  };
  const { actions } = useContext(WidgetMakerContext);

  useEffect(() => {
    const updatedConfig: TwitterWidgetConfig = {
      username: (selected as SearchResultData)?.twitter,
    };
    actions.updateChartConfig(updatedConfig);
  }, [selected]);

  return (
    <Wrapper>
      <SearchWrapper>
        <div>Search for a player:</div>
        <Search size={'12px'} hasTwitter={true} onSelect={onSelect} />
      </SearchWrapper>
      {
        selected && (
          <SearchResultWrapper>
            <ResultImage src={selected.imgUrl} />
            <UserInfoWrapper>
              <div>{`${selected.firstName} ${selected.lastName}`}</div>
              <div>{`@${selected.twitter}`}</div>
            </UserInfoWrapper>
          </SearchResultWrapper>
        )
      }
    </Wrapper>
  )
}