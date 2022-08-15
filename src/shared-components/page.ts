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

export const SectionHeader = styled.div`
  background: ${colors.blue};
  box-sizing: border-box;
  color: ${colors.white};
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem;
`;

export const SectionSubheader = styled.div`
  border-bottom: 1px solid ${colors.darkGray};
  box-sizing: border-box;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 2rem 0 0.5rem 0;

  &:nth-of-type(1) {
    padding-top: 0;
  }
`;