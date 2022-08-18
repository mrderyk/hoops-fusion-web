import { TopLinks } from 'shared-components/Header/styled';
import { getLogoForTeamCode } from '../../../utils';
import { Details, DetailsCell, DetailsRow, Name, NameOriginWrapper, Number, Origin, Photo, TeamLogo, TeamLogoWrapper, Wrapper } from "./styled";

export interface HeaderProps {
  firstName: string;
  lastName: string;
  imgUrl: string;
  number: number;
  birthCity: string;
  birthState: string;
  birthCountry: string;
  team: string;
  dob: string;
  height: string;
  weight: string;
  position: string;
  key: string;
}

// TODO: Unify with universal header
export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const teamImgSrc = getLogoForTeamCode(props.team);

  return (
    <>
      <TopLinks>
        <li>
          <a href="/dashboard">MY DASHBOARD</a>
        </li>
        <li>
          <a href="/">HOME</a>
        </li>
      </TopLinks>
      <Wrapper>
        <Photo src={props.imgUrl} />
        <Number>{props.number}</Number>
        <NameOriginWrapper>
          <Name>{props.firstName.toUpperCase()} {props.lastName.toUpperCase()}</Name>
          <Origin>{props.birthCity}, {props.birthState && `${props.birthState},` } {props.birthCountry}</Origin>
        </NameOriginWrapper>
        <Details>
          <tbody>
            <DetailsRow>
              <DetailsCell>POSITION</DetailsCell>
              <DetailsCell>{props.position}</DetailsCell>
            </DetailsRow>
            <DetailsRow>
              <DetailsCell>BORN</DetailsCell>
              <DetailsCell>{props.dob}</DetailsCell>
            </DetailsRow>
            <DetailsRow>
              <DetailsCell>HEIGHT</DetailsCell>
              <DetailsCell>{props.height}</DetailsCell>
            </DetailsRow>
            <DetailsRow>
              <DetailsCell>WEIGHT</DetailsCell>
              <DetailsCell>{props.weight}</DetailsCell>
            </DetailsRow>
          </tbody>
        </Details>
        <TeamLogoWrapper>
        {
          teamImgSrc &&
          <TeamLogo src={getLogoForTeamCode(props.team)} />
        }
        </TeamLogoWrapper>
      </Wrapper>
    </>
  )
};