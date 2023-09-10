import styled, { css } from 'styled-components';
import { IFileUploaderStyle } from '@src/components/UI/FileUploader/types';

export const FileUploaderWrapper = styled.label<IFileUploaderStyle>`
  position: relative;
  display: block;
  margin: ${({ margin = '5px 0' }) => margin};
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '100%' }) => height};
  font-size: ${({ fz = 16 }) => `${fz}px`};
  border: 2px dotted ${({
    isValid,
    theme,
  }) => (isValid ? '#E2E8F0' : theme.accentColorActive)};
  color: ${({ theme }) => theme.secondaryTextColor};
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.accentColor};
    color: ${({ theme }) => theme.accentColor};
  }


  ${({ value }) => {
    if (value) {
      return css`
        border-color: transparent;
        box-shadow: ${({ theme }) => theme.modalShadow};

        &:hover {
          border-color: transparent;
          color: ${({ theme }) => theme.reverseLight};
        }
      `;
    }
  }}
`;

export const FileUploaderImgWrapper = styled.div`
  width: calc(100% + 5px);
  height: calc(100% + 5px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const FileUploaderFiller = styled.div<IFileUploaderStyle>`
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  opacity: 0;

  ${({ isActive }) => {
    if (!isActive) {
      return css`
        &:hover {
          opacity: 1;
          transition: all 0.2s;
        }
      `;
    }
  }}


`;

export const FileUploaderImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: fill;
  border-radius: 3px;
  z-index: 10;
`;

export const FileUploaderTextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: inherit;
`;

export const FileUploaderText = styled.p`
  color: inherit;
`;

export const FileUploaderIcon = styled.span`
  font-size: 35px;
`;

export const FileUploaderInput = styled.input`
  display: none;
`;
