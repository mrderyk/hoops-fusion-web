import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1380px) {
    flex-direction: row;
  }
`;

export const TwitterWrapper = styled.div`
  flex: 1;

  @media (max-width: 1380px) {
    flex: 0;
    width: 50%;
  }
`;

export const HighlightsWrapper = styled.div`
  @media (max-width: 1380px) {
    width: 50%;
  }
`;
