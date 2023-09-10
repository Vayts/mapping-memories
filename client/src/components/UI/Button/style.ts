import styled, { css } from 'styled-components';
import { IButtonStyle } from './types';

export const ButtonItem = styled.button<IButtonStyle>`
  min-height: ${({ height = '35px' }) => height}
  height: ${({ height = 'auto' }) => height};
  margin: ${({ margin = '5px 0' }) => margin};
  padding: ${({ padding = '7px 20px' }) => padding};
  font-size: ${({ fz = 16 }) => `${fz}px`};
  font-weight: ${({ fw = 400 }) => fw};
  width: ${({ width = 'auto' }) => width};
  display: block;
  border-radius: ${({ br = '2px' }) => br};
  border: 1px solid transparent;
  position: relative;
  transition: all 0.1s;

  &:disabled, &[disabled] {
    background-color: ${({ theme }) => theme.semiLightBgColor} !important;
    color: ${({ theme }) => theme.lightBgColor} !important;
    border-color: ${({ theme }) => theme.borderColor} !important;

    &:hover {
      cursor: default;
      background-color: ${({ theme }) => theme.semiLightBgColor} !important;
      color: ${({ theme }) => theme.lightBgColor} !important;
      border-color: ${({ theme }) => theme.borderColor} !important;
    }
  }

  &:hover {
    cursor: pointer;
    transition: all 0.2s;
  }

  ${({ styleType }) => {
    if (styleType === 'transparent') {
      return css`
        background-color: transparent;
        border-color: #3e3e3e;
        box-shadow: none;
        color: #3e3e3e;

        &:hover {
          background-color: ${({ theme }) => theme.brightBgColor};
        }
      `;
    }

    if (styleType === 'reverse') {
      return css`
        background-color: ${({ theme }) => theme.brightBgColor};
        color: ${({ theme }) => theme.secondaryTextColor};
        border-color: ${({ theme }) => theme.borderColor};

        &:hover {
          background-color: ${({ theme }) => theme.semiLightBgColor};
          border: 1px solid ${({ theme }) => theme.semiLightBgColor};
          color: ${({ theme }) => theme.primaryTextColor};
        }
      `;
    }

    return css`
      border: 1px solid ${({ theme }) => theme.accentColor};
      background-color: ${({ theme }) => theme.accentColor};
      color: #fff;

      &:hover {
        background-color: ${({ theme }) => theme.accentColorActive};
        border: 1px solid ${({ theme }) => theme.accentColorActive};
        color: #fff;
      }
    `;
  }}
`;

export const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonIcon = styled.span<IButtonStyle>`
  font-size: ${({ fz = 16 }) => `${fz}px`};
  opacity: ${({ isLoading }) => (isLoading ? '0' : '1')};
`;

export const ButtonText = styled.p<IButtonStyle>`
  margin: 0 5px;
  opacity: ${({ isLoading }) => (isLoading ? '0' : '1')};
`;
