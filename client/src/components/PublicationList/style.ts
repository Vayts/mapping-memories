import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const PublicationListWrapper = styled.div`
  margin: 0 0 20px;
  padding: 0 0 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 23px;

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PublicationItem = styled.article`
  margin-bottom: 15px;
`;
