import React, { useContext, useEffect, useState } from 'react';
import { Search, SearchResultData } from 'widgets/Search';
import { ResultImage } from 'widgets/Search/styled';
import { WidgetMakerContext } from '../context';
import { TwitterWidgetConfig } from '../context/types';
import { SearchResultWrapper, SearchWrapper, UserInfoWrapper, Wrapper } from './styled';
import { WithTitleInput } from '../WithTitleInput';

export const TwitterConfigurator: React.FC<{}> = () => {
  const [selected, setSelected] = useState<SearchResultData|null>(null);
  const onSelect = (result: SearchResultData) => {
    setSelected(result);
  };
  const { state, actions } = useContext(WidgetMakerContext);

  useEffect(() => {
    const updatedConfig: TwitterWidgetConfig = {
      ...state.configuration,
      username: (selected as SearchResultData)?.twitter,
    };

    actions.updateConfig(updatedConfig);
  }, [selected]);

  return (
    <WithTitleInput placeholder={'ex. KD\'s Tweets'}>
      <Wrapper>
        <SearchWrapper>
          <div>Search for a player:</div>
          <Search size={'small'} hasTwitter={true} onSelect={onSelect} />
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
    </WithTitleInput>
  )
};
