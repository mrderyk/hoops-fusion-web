import styled from '@emotion/styled';
import { black, blue } from '../../../colors';

export const DirectoryList = styled.ul`
  list-style-type: none;
`;

export const DirectoryListItem = styled.li`
  border-bottom: 1px solid transparent;
  box-sizing: border-box;
  color: ${black};
  font-size: 1.2rem;
  padding: .4rem 0;
  

  &:hover {
    color: ${blue};
    text-decoration: underline;
  }
`;

export const DirectoryLink = styled.a`
  align-items: center;
  display: flex;
`;

export const FirstName = styled.div`
  font-weight: 400;
  padding-left: .2rem;
`;

export const LastName = styled.div`
  font-weight: 600;
  padding-left: .6rem;
`;

export const DirectoryImage = styled.div<{src: string | undefined}>`
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: 28px auto;
  border: 1px solid rgb(120, 120, 120);
  border-radius: 2px;
  height: 36px;
  width: 30px;
`;