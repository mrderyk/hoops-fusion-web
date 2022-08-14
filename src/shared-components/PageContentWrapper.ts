import styled from '@emotion/styled';

export const PageContentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 0.5rem;

  @media (max-width: 1380px) {
    flex-direction: column;
  }
`;