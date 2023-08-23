import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const InterviewListWrapper = styled.ul`
  margin: 0 0 30px;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const InterviewItem = styled.li`
  max-width: 380px;
  grid-template: 'row';
  margin-bottom: 10px;
`;
