import { Search } from "widgets/Search";
import { NavLink, SearchWrapper, Wrapper } from "./styled";

// TODO: Unify with universal header
export const Nav: React.FC<{hasSocials: boolean}> = ({ hasSocials }) => {
  return (
    <Wrapper>
      <NavLink>
        <a href="#stats">CAREER STATS</a>
      </NavLink>
      <NavLink>
        <a href="#trends">CAREER TRENDS</a>
      </NavLink>
      {
        hasSocials &&
        <NavLink>
        <a href="#social">SOCIAL</a>
      </NavLink>
      }
      <SearchWrapper>
        <Search size={'small'} />
      </SearchWrapper>
    </Wrapper>
  )
};