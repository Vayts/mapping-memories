import styled from 'styled-components';
import { IErrorWrapperStyle } from '@src/components/UI/ErrorMsg/types';

export const ErrorMsgWrapper = styled.div<IErrorWrapperStyle>`
	min-height: 17px;
	margin: ${({ margin = '0' }) => margin};
`;

export const ErrorMsgText = styled.p<IErrorWrapperStyle>`
	margin: 0;
	font-size: 14px;
	color: ${({ theme }) => theme.dangerColor};
	text-align: ${({ align = 'left' }) => align};
`;
