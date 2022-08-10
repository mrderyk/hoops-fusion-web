import { InnerWrapper, SearchWrapper, Wrapper } from './styled';
import { Search } from '../../shared-components/Search';
import { BoxLogo } from './components/BoxLogo';

export const Home = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <BoxLogo />
        <SearchWrapper>
          <Search />
        </SearchWrapper>
      </InnerWrapper>
    </Wrapper>
  )
};