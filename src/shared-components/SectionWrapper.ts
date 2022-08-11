import styled from '@emotion/styled';
import * as colors from '../colors';

export const SectionWrapper = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 0 3px 1px rgb(0 0 0 / 50%);

  flex: 1;
  margin: .5rem 0;
  margin-bottom: .75rem;
  overflow: hidden;
  text-align: left;
`

export const SectionInnerWrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem 1rem 2rem 1rem;
`;