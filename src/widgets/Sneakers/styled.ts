import styled from '@emotion/styled';
import * as colors from '../../colors';

export const SneakerList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const SneakerWrapper = styled.li<{imgUrl: string}>`
  border: 1px solid ${colors.midGray};
  background: url('${props => props.imgUrl}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 4px;
  cursor: pointer;
  margin: .5rem 0;
  position: relative;

  max-width: 280px;

  &:hover {
    background-color: ${colors.lightGray};
  }
  
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  & div {
    font-size: .8rem;
  }
`;

export const SneakerName = styled.div`
  box-sizing: border-box;
  font-weight: 600;
  padding: .5rem;

  & div {
    font-size: .7rem;

    &:nth-of-type(2) {
      font-size: .8rem;
    }
  }
`

export const SneakerPrice = styled.div`
  bottom: 0;
  box-sizing: border-box;
  
  font-weight: 600;
  padding: .5rem;
  position: absolute;
  right: 0;

  & div {
    &:nth-of-type(1) {
      font-size: .6rem;
      text-align: right;
    }

    &:nth-of-type(2) {
      font-size: 1rem;
    }
  }
`

export const ViewMoreLink = styled.a`
  font-size: .8rem;
  color: ${colors.blue};
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;
