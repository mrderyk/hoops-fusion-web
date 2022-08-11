import React from "react";
import { ContentWrapper, Wrapper } from "./styled";

export const Header: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        { children }
      </ContentWrapper>
    </Wrapper>
  )
};