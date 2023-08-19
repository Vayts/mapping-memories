import styled from 'styled-components';
import { IInputStyle } from '@src/components/UI/Input/types';

export const InputWrapper = styled.div<IInputStyle>`
  display: flex;
  flex-direction: column;
  margin: ${({ margin = '5px 0' }) => margin};
  width: ${({ width = 'auto' }) => width};
  font-size: ${({ fz = 16 }) => `${fz}px`};
`;

export const InputLabel = styled.label<IInputStyle>`
	margin-bottom: 10px;
	font-size: inherit;
	color: ${({ theme, isValid }) => (isValid ? 'inherit' : theme.accentColorActive)};
`;

export const InputElemWrapper = styled.div`
  position: relative;
`;

export const InputElem = styled.input<IInputStyle>`
  height: ${({ height = 'auto' }) => height};
  padding: ${({ padding = '10px 30px 10px 20px' }) => padding};
  font-size: ${({ fz = 16 }) => `${fz}px`};
  width: 100%;
  border: 1px solid ${({ isValid, theme }) => (isValid ? '#E2E8F0' : theme.dangerColor)};
  background-color: transparent;
  border-radius: 5px;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${({ theme }) => theme.lightBgColor};;
  }
	
  &:focus {
    outline: none;
    border-color: ${({ theme, isValid }) => (isValid ? theme.blackColor : theme.dangerColor)};
  }
	
  &::placeholder {
    font-size: ${({ fz = 16 }) => `${fz}px`};
    color: ${({ theme }) => theme.lightBgColor};
  }
`;

export const InputSecureIcon = styled.div`
  position: absolute;
	transform: translateY(-50%);
	top: 50%;
	right: 10px;
	font-size: 20px;
	user-select: none;
	cursor: pointer;
	color: ${({ theme }) => theme.lightTxtColor};
	
	&:active {
    color: ${({ theme }) => theme.primary};
	}
`;
