import styled from '@emotion/styled';
import * as colors from '../../../colors';

export const Wrapper = styled.div`
  align-items: center;
  background-color: rgb(50, 50, 50);
  border-bottom: 1px solid ${colors.lightGray};
  box-sizing: border-box;
  color: white;
  padding: 0 0 0 1rem;
  display: flex;
  height: 120px;
  text-align: left;
  width: 100%;
`;

export const Photo = styled.div<{src: string | undefined}>`
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: 80px auto;
  box-sizing: border-box;
  border-radius: 4px;
  height: 90px;
  overflow: hidden;
  padding: 10px 0;
  width: 80px;
`;

export const NameOriginWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px 1.2rem;
`;

export const Name = styled.div<{ children: React.ReactNode }>`
  font-weight: 400;
  font-size: ${props => 
    props.children?.toString() && props.children?.toString().length > 20 ? 
      '1.8rem': '3.5rem' 
  };

  @media (max-width: 1100px) {
    font-size: ${props => 
      props.children?.toString() && props.children?.toString().length > 20 ? 
        '1.2rem': '2.6rem' 
    };
  }

  @media (max-width: 960px) {
    font-size: ${props => 
      props.children?.toString() && props.children?.toString().length > 20 ? 
        '1.2rem': '1.5rem' 
    };
  }
`;

export const Origin = styled.div`
  font-size: 1rem;
  font-weight: 300;
  text-align: right;
  width: 100%;
`;

export const Number = styled.div`
  box-sizing: border-box;
  padding: 10px 0 10px 1.5rem;
  font-size: 100px;
  font-weight: 600;
`;

export const Details = styled.table`
  box-sizing: border-box;
  font-size: 0.8rem;
  padding: 10px 1rem 10px 1rem;
  flex: 1;
`;

export const TeamLogoWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 10px 1rem;
  text-align: right;
`;

export const TeamLogo = styled.img`
  background-color: ${colors.white};
  box-sizing: border-box;
  border-radius: 4px;
  height: 100%;
  padding: .5rem;
  width: auto;
`;

export const DetailsRow = styled.tr`

`

export const DetailsCell = styled.td`
  box-sizing: border-box;
  
  &:nth-of-type(odd) {
    font-weight: 600;
    width: 1px;
  }

  &:nth-of-type(even) {
    font-weight: 400;
    padding-left: 1rem;
  }
`;