import { useLazyQuery, gql } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { Input, Result, ResultImage, ResultLabels, ResultName, ResultPlayerTeam, Results, ResultsWrapper, SearchIconWrapper, SearchInputWrapper, Wrapper } from './styled';
import debounce from 'lodash.debounce'
import { SearchIcon } from '../../icons/SearchIcon';
import { useRouter } from 'next/router';
import { TextInputProps } from 'shared-components/TextInput';

const GET_PLAYERS_SEARCH_RESULTS = gql`
  query SearchPlayers($searchString: String!, $hasTwitter: Boolean, $hasHighlights: Boolean) {
    searchPlayers(searchString: $searchString, hasTwitter: $hasTwitter, hasHighlights: $hasHighlights) {
      firstName
      lastName
      imgUrl
      key
      teamCode
      twitter
      highlights
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
  twitter: string;
  highlights: string[];
}

interface SearchProps {
  size?: 'small' | 'large';
  onSelect?: (resultData: SearchResultData) => void;
  hasTwitter?: boolean;
  hasHighlights?: boolean;
}

export const Search: React.FC<SearchProps> = ({ size, onSelect, hasTwitter, hasHighlights }) => {
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
  
      getSearchResults({
        variables: {
          searchString: searchString.toLowerCase(),
          hasTwitter,
          hasHighlights,
        }
      })
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

  const searchInput = size === 'small' ?
    <SmallSearchInput hasResults={!!results} onChange={onSearch} /> :
    <SearchInput hasResults={!!results} onChange={onSearch}/>;
  return (
    <>
      <Wrapper onBlur={onBlur}>
        { searchInput }
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
};

interface SearchInputProps extends TextInputProps {
  hasResults: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange, value, hasResults }) => {
  return (
    <SearchInputWrapper hasResults={!!hasResults} fontSize={'1.5rem'}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Input value={value} type="text" onChange={onChange} fontSize={'1.5rem'}  />
    </SearchInputWrapper>
  )
};

const SmallSearchInput: React.FC<SearchInputProps> = ({ onChange, value, hasResults }) => {
  return (
    <SearchInputWrapper hasResults={!!hasResults} fontSize={'12px'}>
      <SearchIconWrapper>
        <SearchIcon size={'12px'} />
      </SearchIconWrapper>
      <Input value={value} type="text" onChange={onChange} fontSize={'12px'}  />
    </SearchInputWrapper>
  )
};
