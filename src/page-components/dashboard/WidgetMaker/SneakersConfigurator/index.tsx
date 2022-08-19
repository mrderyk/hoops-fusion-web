import React, { useContext, useEffect, useState } from 'react';
import { Search, SearchResultData } from 'widgets/Search';
import { ResultImage } from 'widgets/Search/styled';
import { WidgetMakerContext } from '../context';
import { SneakersWidgetConfig } from '../context/types';
import { SearchResultWrapper, SearchWrapper, UserInfoWrapper, Wrapper } from './styled';
import { WithTitleInput } from '../WithTitleInput';

export const SneakerConfigurator: React.FC<{}> = () => {
  const [selected, setSelected] = useState<SearchResultData|null>(null);
  const onSelect = (result: SearchResultData) => {
    setSelected(result);
  };
  const { state, actions } = useContext(WidgetMakerContext);

  useEffect(() => {
    const updatedConfig: SneakersWidgetConfig = {
      ...state.configuration,
      sneakerTokens: (selected as SearchResultData)?.sneakerTokens,
    };

    actions.updateConfig(updatedConfig);
  }, [selected]);

  return (
    <WithTitleInput placeholder={'ex. Jordans'}>
      <Wrapper>
        <SearchWrapper>
          <div>Search for a player:</div>
          <Search size={'small'} hasSneakers={true} onSelect={onSelect} placeholder={'ex. Michael Jordan'} />
        </SearchWrapper>
        {
          selected && (
            <SearchResultWrapper>
              <ResultImage src={selected.imgUrl} />
              <UserInfoWrapper>
                <div>{`${selected.firstName} ${selected.lastName}`}</div>
              </UserInfoWrapper>
            </SearchResultWrapper>
          )
        }
      </Wrapper>
    </WithTitleInput>
  )
};
