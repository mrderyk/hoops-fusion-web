import { Search } from "widgets/Search";
import { NavLink, SearchWrapper, Wrapper } from "./styled";

export const Nav = () => {
  return (
    <Wrapper>
      <NavLink>
        <a href="#stats">CAREER STATS</a>
      </NavLink>
      <NavLink>
        <a href="#trends">CAREER TRENDS</a>
      </NavLink>
      <NavLink>
        <a href="#social">SOCIAL</a>
      </NavLink>
      <SearchWrapper>
        <Search size={'12px'} />
      </SearchWrapper>
    </Wrapper>
  )
};