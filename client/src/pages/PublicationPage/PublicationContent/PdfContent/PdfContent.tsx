import React from 'react';
import { IPdfContentProps } from '@src/pages/PublicationPage/PublicationContent/PdfContent/types';
import { BASE_URL } from '@src/api/api';
import * as S from './style';

const PdfContent: React.FC<IPdfContentProps> = ({ contentBlock }) => {
  const { content, _id } = contentBlock;
  
  return (
    <S.PdfContentWrapper>
      <S.PdfContentViewer title={`${_id}pdf`} src={`${BASE_URL}/file/download/pdf?id=${content.file}`}/>
    </S.PdfContentWrapper>
  );
};

export default PdfContent;
