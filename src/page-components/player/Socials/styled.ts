import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1380px) {
    flex-direction: row;
  }
`;

export const TwitterFeedWrapper = styled.div`
  box-sizing: border-box;
  flex: 1;
  min-width: 280px;
  max-height: 540px;
  overflow: scroll;
  padding: .5rem 0;

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
