import styled from 'styled-components';
import { ITitle } from '@src/components/UI/Title/types';

export const TitleItem = styled.h3<ITitle>`
  font-weight: ${({ fw = 500 }) => fw};
  font-size: ${({ fz = 19 }) => `${fz}px`};
  margin: ${({ margin = '15px 0' }) => margin};
  padding: ${({ padding = '0' }) => padding};
  color: ${({ color = 'inherit' }) => color};
  height: ${({ height = 'auto' }) => height};
  text-align: ${({ align = 'left' }) => align};
`;
