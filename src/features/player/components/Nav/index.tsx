import { Search } from "../../../../shared-components/Search";
import { NavLink, SearchWrapper, Wrapper } from "./styled";

export const Nav = () => {
  return (
    <Wrapper>
      <NavLink>
        <a href="#stats">STATS</a>
      </NavLink>
      <NavLink>
        <a href="#trends">CAREER TRENDS</a>
      </NavLink>
      <NavLink>
        <a href="#sneakers">SNEAKERS</a>
      </NavLink>
      <NavLink>
        <a href="#highlights">HIGHLIGHTS</a>
      </NavLink>
      <SearchWrapper>
        <Search size={'12px'} />
      </SearchWrapper>
    </Wrapper>
  )
};