import { keyframes } from 'styled-components';

export const opacityAppear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const scaleAppear = keyframes`
  from {
    opacity: 0;
	  scale: 0.8;
  }

  to {
    opacity: 1;
    scale: 1;
  }
`;

export const bottomJump = keyframes`
  from {
    opacity: 0;
    bottom: -15px;
  }

  to {
    opacity: 1;
    bottom: 0;
  }
`;
