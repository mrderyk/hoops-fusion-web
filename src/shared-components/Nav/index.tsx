import { SearchInnerWrapper } from "pages/players/components/styled";
import React from "react";
import { Search } from "widgets/Search";
import { NavLink, SearchWrapper, Wrapper } from "./styled";

export interface Link {
  href: string;
  text: string;
}

export interface NavConfig {
  links: Link[];
  extras?: React.ReactNode[];
}

export const Nav: React.FC<NavConfig> = ({ links, extras }) => {
  return (
    <Wrapper>
    {
      links.map((link: Link) => (
        <NavLink key={`nav_link_${link.text}_${link.href}`}>
          <a href={link.href}>{link.text}</a>
        </NavLink>
      ))
    }
      <SearchWrapper>
        <SearchInnerWrapper>
          <Search size={'12px'} />
        </SearchInnerWrapper>
      </SearchWrapper>
    </Wrapper>
  )
};
