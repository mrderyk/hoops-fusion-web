import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  width: 100%;
`;

export const BoxLogoTitleWrapper = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, .7);
  display: flex;
  font-size: 2rem;
  font-weight: 400;
  height: 100%;
  left: 0;
  padding: 10px 1rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
`;

export const BoxLogoBgTilesWrapper = styled.div`
  height: 100%;
  position: relative;
  text-align: initial;
  width: 100%;
  z-index: 1;
`;

export const BoxLogoBgTile = styled.img`
  height: 100%;
  width: auto;
  position: relative;
  z-index: 200;
`;

export const TitleWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  padding: .3rem .3rem;
  width: 100%;
  z-index: 2;
`;

export const Title = styled.h1`
  color: white;
  font-weight: 600;
  margin: 0
`;