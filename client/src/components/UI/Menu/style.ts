import styled, { keyframes } from 'styled-components';
import { IMenuStyle } from '@src/components/UI/Menu/types';

const appear = keyframes`
  0% {
    opacity: 0;
	  transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const MenuWrapper = styled.div<IMenuStyle>`
  display: inline-block;
  position: relative;
  height: 20px;
  z-index: ${({ isOpen }) => (isOpen ? '10' : '1')};
  width: 20px;
`;

export const MenuIcon = styled.span`
  line-height: 1;
  font-size: 22px;
  z-index: 12;
  color: ${({ theme }) => theme.lightTxtColor};

  &:hover {
    cursor: pointer;
    transition: all 0.2s;
    color: ${({ theme }) => theme.accentColor};
  }
`;

export const MenuContent = styled.div<IMenuStyle>`
  background-color: #ffffff;
  position: absolute;
  right: 50%;
  bottom: -100%;
  width: 200px;
  max-width: 200px;
  box-shadow: ${({ theme }) => theme.softShadow};
  border-radius: 5px;
  border: 1px solid #efefef;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: ${appear} 0.1s linear;
`;
