import { SearchInnerWrapper } from "pages/players/components/styled";
import React from "react";
import { Search } from "widgets/Search";
import { NavLink, SearchWrapper, SubNavLink, SubNavWrapper, Wrapper } from "./styled";

export interface Link {
  href: string;
  text: string;
}

export interface NavConfig {
  links: Link[];
}

export const Nav: React.FC<NavConfig> = ({ links }) => {
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
          <Search size={'small'} />
        </SearchInnerWrapper>
      </SearchWrapper>
    </Wrapper>
  )
};

export const SubNav: React.FC<NavConfig> = ({ links }) => {
  return (
    <SubNavWrapper>
    {
      links.map((link: Link) => (
        <SubNavLink key={`nav_link_${link.text}_${link.href}`}>
          <a href={link.href}>{link.text}</a>
        </SubNavLink>
      ))
    }
    </SubNavWrapper>
  )
};
