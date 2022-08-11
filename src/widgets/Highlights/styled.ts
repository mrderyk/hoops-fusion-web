import styled from '@emotion/styled';

export const HighlightsWrapper = styled.ul`
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  max-height: 700px;
  margin: 0;
  overflow: scroll;
  padding: 0;
`;

export const HighlightWrapper = styled.li`
  box-sizing: border-box;
  height: 280px;
  min-width: 280px;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
`;

export const HighlightIFrame = styled.iframe`
  border-radius: 4px;
  height: 100%;
  width: 100%;
`;