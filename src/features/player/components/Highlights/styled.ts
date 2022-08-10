import styled from '@emotion/styled';

export const HighlightsWrapper = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  overflow: scroll;
  padding: 0;
`;

export const HighlightWrapper = styled.li`
  box-sizing: border-box;
  min-width: 280px;
  min-height: 280px;
  overflow: hidden;
  padding: 1rem;

  &:first-of-type {
    padding-left: 0;
  }
`;

export const HighlightIFrame = styled.iframe`
  border-radius: 4px;
  height: 100%;
  width: 100%;
`;