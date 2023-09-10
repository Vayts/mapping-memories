import styled from 'styled-components';
import { IPdfUploaderStyle } from '@src/components/UI/PdfUploader/types';

export const PdfUploaderWrapper = styled.div<IPdfUploaderStyle>`
  margin: ${({ margin = '5px 0' }) => margin};
  width: auto;
  display: flex;
  align-items: center;
  
  span {
    margin-left: 10px;
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PdfContentWrapper = styled.label`
  display: flex;
  align-items: center;
`;

export const PdfDeleteButton = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.lightTxtColor};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
  }
`;

export const PdfInput = styled.input.attrs({ type: 'file', accept: '.pdf' })`
  display: none;
`;
