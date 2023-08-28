import styled from 'styled-components';
import { ITagStyle } from '@src/components/Tag/types';

export const TagWrapper = styled.span<ITagStyle>`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ theme, color }) => `${color}30` || `${theme.accentColor}30`};
  color: ${({ theme, color }) => color || theme.accentColor};
  line-height: 14px;
  align-self: flex-start;
`;

export const TagText = styled.span`
  font-size: 14px;
  line-height: 14px;
  //font-weight: 600;
`;
