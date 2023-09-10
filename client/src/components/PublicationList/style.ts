import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const PublicationListWrapper = styled.div`
  margin: 0 0 20px;
  padding: 0 0 10px;
  display: grid;

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PublicationItem = styled.article`
  margin-bottom: 15px;
`;
