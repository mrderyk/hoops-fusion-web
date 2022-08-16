import { useLazyQuery, gql } from '@apollo/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Filter, FiltersWrapper, Input, InputWrapper, Result, ResultImage, ResultLabels, ResultName, ResultPlayerTeam, Results, ResultsWrapper, SearchIconWrapper, Wrapper } from './styled';
import debounce from 'lodash.debounce'
import { SearchIcon } from '../../icons/SearchIcon';
import { useRouter } from 'next/router';
import Link from 'next/link';

const GET_PLAYERS_SEARCH_RESULTS = gql`
  query SearchPlayers($searchString: String!) {
    searchPlayers(searchString: $searchString) {
      firstName
      lastName
      imgUrl
      key
      teamCode
    }
  }
`;

type Filter = 'player' | 'team';

export interface SearchResultData {
  firstName: string;
  lastName: string;
  imgUrl: string | undefined;
  key: string;
  teamCode: string;
}

interface SearchProps {
  size?: string;
  onSelect?: (resultData: SearchResultData) => void;
}

export const Search: React.FC<SearchProps> = ({ size, onSelect }) => {
  const [ results, setResults ] = useState<SearchResultData[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { push } = useRouter();
  const [ getSearchResults, { loading }] = useLazyQuery(GET_PLAYERS_SEARCH_RESULTS, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    onCompleted: (data: any) => {
      // TODO: Figure out how to limit via join-monster on back end
      setResults(data.searchPlayers.slice(0, 10))
    }
  });

  const doSearch = useCallback(
    debounce(async (searchString: string) => {
      if (searchString.length < 3) {
        setResults(null);
        return;
      }
  
      getSearchResults({ variables: { searchString: searchString.toLowerCase() } })
    }, 1000),
    []
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
    doSearch(e.currentTarget.value.trim());
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;
    setResults(null);
  };

  const generateOnSelect = (entityKey: string) => () => {
    const resultData = results?.find((result: SearchResultData) => result.key === entityKey);
  
    if (onSelect) {
      resultData && onSelect(resultData);
    } else {
      push(`/player/${entityKey}`);
    }

    setSearchTerm('');
    setResults(null);
  };

  return (
    <>
      <Wrapper onBlur={onBlur}>
        <InputWrapper hasResults={!!results} fontSize={size}>
          <SearchIconWrapper>
            <SearchIcon size={size} />
          </SearchIconWrapper>
          <Input value={searchTerm} type="text" onChange={onSearch} fontSize={size}  />
        </InputWrapper>
        {
          results && (
            <ResultsWrapper>
              <SearchResults results={results} fontSize={size} generateOnSelect={generateOnSelect}/>
            </ResultsWrapper>
          )
        }
      </Wrapper>

    </>
  );
};

interface SearchResultsProps {
  results: SearchResultData[];
  generateOnSelect: (entityKey: string) => () => void;
  fontSize?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, fontSize, generateOnSelect }) =>{
  return (
    <Results>
      {
        results.map((result: SearchResultData) => {
          return (
            <SearchResult
              key={result.key}
              firstName={result.firstName}
              lastName={result.lastName}
              imgUrl={result.imgUrl}
              entityKey={result.key}
              teamCode={result.teamCode}
              fontSize={fontSize}
              onSelect={generateOnSelect(result.key)}
            />
          );
        })
      }
    </Results>
  )
}

interface SearchResultProps {
  firstName: string;
  lastName: string;
  imgUrl: string | undefined;
  entityKey: string;
  teamCode: string;
  onSelect: () => void;
  fontSize?: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ firstName, lastName, imgUrl, entityKey, teamCode, fontSize, onSelect }: SearchResultProps) => {
  return (
    <Result key={entityKey} tabIndex={0} onClick={onSelect}>
      <ResultImage src={imgUrl} />
      <ResultLabels>
        <ResultName fontSize={fontSize}>
          {`${firstName} ${lastName}`}
        </ResultName>
        <ResultPlayerTeam>
          {teamCode}
        </ResultPlayerTeam>
      </ResultLabels>
    </Result>
  )
}