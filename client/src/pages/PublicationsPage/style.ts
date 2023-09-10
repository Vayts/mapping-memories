import styled from 'styled-components';

export const PublicationsPageWrapper = styled.div`
  min-height: calc(100vh - 100px);
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

export const PublicationsMoreButton = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

export const PublicationsListWrapper = styled.div`
  position: relative;
  min-height: 200px;
`;
