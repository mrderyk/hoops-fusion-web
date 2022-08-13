import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  left: 0;
  position: absolute;
  text-align: center;
  top: 0;
  white-space: nowrap;
  width: 100%;
`;

export const BoxLogoTitleWrapper = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, .8);
  display: flex;
  font-size: 2rem;
  font-weight: 400;
  height: 100%;
  padding: 10px 1rem;
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