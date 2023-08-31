import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const VideoContentWrapper = styled.div`
  margin: 25px 0 15px;
`;

export const VideoContentIframe = styled.iframe`
  width: 100%;
  height: 260px;

  @media screen and (min-width: ${RESPONSIVE.mobileL}) {
    height: 320px;
  }

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    height: 420px;
  }
`;
