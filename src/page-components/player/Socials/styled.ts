import styled from '@emotion/styled';
import { midGray } from 'src/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1380px) {
    flex-direction: row;
  }
`;

export const FeedScrollWrapper = styled.div`
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

export const HighlightsScrollWrapper = styled.div`
  max-height: 540px;
  overflow: scroll;
`;

export const HighlightsContainer = styled.div`

  @media (max-width: 1380px) {
    flex: 0;
    max-width: 50%;
  }
  
`
