import styled from '@emotion/styled';
import { blue } from 'src/colors';

export const Wrapper = styled.div``;
export const Link = styled.a`
  color: ${blue};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`