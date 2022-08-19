import styled from '@emotion/styled';
import * as colors from '../../colors';

export const TableTitle = styled.div`
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 400;
  padding: 1rem 0 0.5rem;
  text-transform: uppercase;
`;

export const Table = styled.table`
  border-left: 1px solid ${colors.darkGray};
  border-right: 1px solid ${colors.darkGray};
  table-layout: fixed;
  width: 100%;
  min-width: 1000px;
`;

export const HeaderRow = styled.tr`
`

export const TableHeader = styled.th`
  background-color: ${colors.blue};
  border-top: 1px solid ${colors.darkGray};
  border-bottom: 1px solid ${colors.darkGray};
  box-sizing: border-box;
  color: ${colors.white};
  cursor: pointer;
  font-size: .7rem;
  font-weight: 600;
  padding: 0.25rem 0;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }

  &:first-of-type {
    width: 80px;
  }
`;

export const TableRow = styled.tr`
  background-color: ${colors.white};

  &:nth-of-type(even) {
    background-color: ${colors.lightGray}
  }

  &:hover {
    background-color: ${colors.yellow};
  }
`;

export const TableCell = styled.td`
  border-bottom: 1px solid ${colors.darkGray};
  border-right: 1px dotted ${colors.darkGray};
  box-sizing: border-box;
  font-size: .7rem;
  font-weight: 300;
  padding: 0.25rem;
  text-align: right;

  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3) {
    text-align: center;
  }

  &:first-of-type {
    font-weight: 600;
  }

  &:last-of-type {
    border-right: none;
  }
`;