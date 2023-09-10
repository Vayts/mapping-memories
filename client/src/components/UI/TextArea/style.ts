import styled from 'styled-components';
import { ITextAreaStyle } from '@src/components/UI/TextArea/types';

export const TextAreaWrapper = styled.div<ITextAreaStyle>`
  display: flex;
  flex-direction: column;
  margin: ${({ margin = '5px 0' }) => margin};
  width: ${({ width = 'auto' }) => width};
  font-size: ${({ fz = 16 }) => `${fz}px`};
  height: ${({ height = 'auto' }) => height};
`;

export const TextAreaLabel = styled.label<ITextAreaStyle>`
  margin-bottom: 10px;
  font-size: inherit;
  color: ${({ theme, isValid }) => (isValid ? 'inherit' : theme.accentColor)};
`;

export const TextAreaElemWrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const TextAreaElem = styled.textarea<ITextAreaStyle>`
  font-size: ${({ fz = 16 }) => `${fz}px`};
  height: 100%;
  padding: ${({ padding = '10px 30px 10px 20px' }) => padding};
  width: 100%;
  border: 1px solid ${({
    isValid,
    theme,
  }) => (isValid ? '#E2E8F0' : theme.accentColor)};
  background-color: transparent;
  border-radius: 5px;
  transition: all 0.2s;
  resize: none;
  font-family: 'Inter', sans-serif;

  &:hover {
    border-color: ${({ theme }) => theme.lightBgColor};;
  }

  &:focus {
    outline: none;
    border-color: ${({
    theme,
    isValid,
  }) => (isValid ? theme.blackColor : theme.accentColor)};
  }

  &::placeholder {
    font-size: ${({ fz = 16 }) => `${fz}px`};
    color: ${({ theme }) => theme.lightBgColor};
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
`;
