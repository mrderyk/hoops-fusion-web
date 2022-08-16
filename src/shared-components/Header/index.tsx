import React from 'react';
import { ContentWrapper, Wrapper, TopLinks } from './styled';

export const Header: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  return (
    <>
    <TopLinks>
      <li>
        <a href="/dashboard">MY DASHBOARD</a>
      </li>
      <li>
        <a href="/">HOME</a>
      </li>
      
    </TopLinks>
    <Wrapper>
      <ContentWrapper>
        { children }
      </ContentWrapper>
    </Wrapper>
    </>
  )
};