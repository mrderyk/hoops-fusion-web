import styled from '@emotion/styled';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;

  @media (max-width: 1380px) {
    flex-direction: column;
  }
`;

export const PrimaryContent = styled.div`
  flex: 1;
  padding-left: 0.5rem;
  padding-right: 0.25rem;
  width: 75%;

  @media (max-width: 1380px) {
    width: 100%;
  }
`;

export const SecondaryContent = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.5rem;
  width: 25%;

  @media (max-width: 1380px) {
    width: 100%;
  }
`;