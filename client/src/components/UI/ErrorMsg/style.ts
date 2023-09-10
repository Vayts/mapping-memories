import styled from 'styled-components';
import { IErrorWrapperStyle } from '@src/components/UI/ErrorMsg/types';

export const ErrorMsgWrapper = styled.div<IErrorWrapperStyle>`
  min-height: 17px;
  margin: ${({ margin = '2px 0' }) => margin};
  line-height: 1;
`;

export const ErrorMsgText = styled.p<IErrorWrapperStyle>`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.accentColor};
  text-align: ${({ align = 'left' }) => align};
`;
