import React from "react";
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
        <NavLink>
          <a href={link.href}>{link.text}</a>
        </NavLink>
      ))
    }
    { extras }
    </Wrapper>
  )
};
