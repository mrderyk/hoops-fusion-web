import styled from '@emotion/styled';

export const Wrapper = styled.div`
`;

export const LeaderboardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const LeaderboardWrapper = styled.div`
  min-width: 240px;
  padding: 0.5rem;
  width: 25%;
`;

export const PlayerImage = styled.div<{src: string | undefined}>`
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: 20px auto;
  border: 1px solid rgb(120, 120, 120);
  border-radius: 2px;
  box-sizing: border-box;
  height: 24px;
  width: 20px;
`;
