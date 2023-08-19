import styled from 'styled-components';
import { opacityAppear } from '@constants/animations';
import { IEditPhotoStyle } from '@src/components/EditPhoto/types';

export const EditPhotoBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.14);
  z-index: 50;
  animation: ${opacityAppear} 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EditPhotoWrapper = styled.div<IEditPhotoStyle>`
  padding: 0 0 10px;
  background-color: ${({ theme }) => theme.componentBg};
  position: relative;
  min-width: 320px;
  max-width: ${({ width = 600, border = 30 }) => `${width + border * 2}px`};
  background-color: ${({ theme }) => theme.componentBg};
  box-shadow: ${({ theme }) => theme.modalShadow};
  border-radius: 5px;
`;

export const EditPhotoButtons = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;
