import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const FavoriteInterviewListWrapper = styled.ul`
  margin: 0 0 30px;
  padding: 0;
  list-style: none;
  display: flex;
  //grid-template-columns: repeat(1, 1fr);
  gap: 30px;

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    //grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    //grid-template-columns: repeat(2, 1fr);
  }
`;

export const FavoriteInterviewItem = styled.li`
  //x;max-width: 380p
  flex-basis: 33%;
  grid-template: 'row';
  margin-bottom: 10px;
  
  &:nth-child(3) {
    width: 100%;
  }
`;
