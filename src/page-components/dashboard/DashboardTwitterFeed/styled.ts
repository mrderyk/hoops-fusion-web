import styled from '@emotion/styled';
import { midGray } from 'src/colors';

export const Wrapper = styled.div`
  border: 1px solid ${midGray};
  border-radius: 4px;
`;

export const TwitterFeedWrapper = styled.div`
  max-height: 540px;
  overflow: scroll;
  padding: .5rem;
`;