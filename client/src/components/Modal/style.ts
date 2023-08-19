import styled from 'styled-components';
import { bottomJump, opacityAppear } from '@constants/animations';

export const ModalBackground = styled.div`
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

export const ModalContent = styled.div`
  position: relative;
  animation: ${bottomJump} 0.1s ease-in;
`;
