import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const PdfContentWrapper = styled.div`
  margin: 15px 0;
`;

export const PdfContentViewer = styled.iframe`
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
  display: block;

  @media screen and (min-width: ${RESPONSIVE.mobileL}) {
    height: 450px;
  }

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    height: 620px;
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    height: 750px;
  }
`;
