import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const PublicationsPageWrapper = styled.div`
  //min-height: calc(100vh - 60px);
`;

export const PublicationsBanner = styled.div`
  img {
    border-top: 1px solid ${({ theme }) => theme.semiLightBgColor};
    border-bottom: 1px solid ${({ theme }) => theme.semiLightBgColor};
    margin: 20px 0;
    padding: 20px;
    width: 100%;
  }
`;

export const PublicationsControls = styled.div`
  margin-bottom: 30px;

  h3 {
    margin-bottom: 20px;
  }

  & > div {
    width: 100%;
  }

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    h3 {
      margin-bottom: 0;
    }

    & > div {
      width: 250px;
    }
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {

    & > div {
      width: 350px;
    }
  }
`;

export const PublicationsMoreButton = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

export const PublicationsListWrapper = styled.div`
  position: relative;
  min-height: 200px;
`;
