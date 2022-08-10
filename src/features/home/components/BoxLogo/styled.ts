import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 5rem;
  max-width: 600px;
  overflow: hidden;
  position: relative;
  text-align: center;
  white-space: nowrap;
`;

export const BoxLogoTitleWrapper = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, .5);
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

export const BoxLogoBgTilesWrapper = styled.div`
  height: 100%;
  left: calc(0% - 0.2rem);
  position: absolute;
  text-align: initial;
  width: 100%;
`;

export const BoxLogoBgTile = styled.img`
  height: 100%;
  width: auto;
`;

export const TitleWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  padding: .3rem .3rem;
  width: 100%;
`;

export const Title = styled.h1`
  color: white;
  font-weight: 600;
  margin: 0
`;