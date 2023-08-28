import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const InterviewListWrapper = styled.ul`
  margin: 0 0 20px;
  padding: 0 0 10px;
  list-style: none;
  display: grid;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const InterviewItem = styled.li`
  margin-bottom: 15px;
`;
