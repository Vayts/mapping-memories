import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const PublicationPageWrapper = styled.div`
  padding: 30px 0;
  display: flex;
`;

export const PublicationContentWrapper = styled.div`
  position: relative;
  align-self: flex-start;
  flex-grow: 1;
  min-height: 80vh;
  
  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    max-width: 780px;
  }
`;

export const PublicationDate = styled.p`
  margin-top: 0;
  color: ${({ theme }) => theme.accentColor};
`;

export const PublicationAside = styled.aside`
  display: none;
  align-self: flex-start;
  position: relative;
  min-height: 80vh;
  
  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    display: flex;
    flex-basis: 30%;
    margin-left: 30px;
    flex-direction: column;
  }
`;

export const PublicationAsideArticle = styled.article`
  align-self: stretch;
  margin-bottom: 30px;
  
  img {
    max-height: 210px;
  }
`;
