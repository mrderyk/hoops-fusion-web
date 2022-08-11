import styled from '@emotion/styled';
import * as colors from '../../colors';

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