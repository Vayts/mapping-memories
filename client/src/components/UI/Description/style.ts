import styled from 'styled-components';
import { IDescription } from '@src/components/UI/Description/types';

export const DescriptionItem = styled.p<IDescription>`
  font-size: ${({ fz = 14 }) => `${fz}px`};
  margin: ${({ margin = '15px 0' }) => margin};
  color: ${({ color, theme }) => color || theme.subTxtColor};
  height: ${({ height = 'auto' }) => height};
  text-align: ${({ align = 'left' }) => align};
  
  
  p {
    transform: none;
  }
`;
