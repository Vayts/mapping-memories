import React, { ChangeEvent, memo, useCallback, useState } from 'react';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import PdfUploader from '@src/components/UI/PdfUploader/PdfUploader';
import { IPdfContentBlockProps } from '@src/pages/CreatePublication/ContentBlocks/PdfContentBlock/types';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import { BASE_URL } from '@src/api/axios';
import * as Style from '../style';
import * as S from './style';

const PdfContentBlock: React.FC<IPdfContentBlockProps> = ({ onChange, contentBlock, isInEditMode }) => {
  const [isPdfChanged, setPdfChanged] = useState(false);
  const { content, errors, touched, _id } = contentBlock;
  const { t } = useTranslation();
  
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile, _id, 'file');
      
      if (isInEditMode) {
        setPdfChanged(true);
      }
    }
  }, []);
  
  const deleteHandler = useCallback(() => {
    onChange(null, _id, 'file');
  }, []);
  
  return (
    <Style.ContentBlockHolder>
      <Title>{t('pdf')}</Title>
      {content.file && (
        <S.PdfContentBlockViewer
          title={`${_id}pdf`}
          src={isInEditMode && !isPdfChanged ? `${BASE_URL}/file/download/pdf?id=${content.file}` : URL.createObjectURL(content.file)}
        />
      )}
      {!content.file && (
        <S.PdfContentBlockFiller>
          <span>{t('pdfText')}</span>
        </S.PdfContentBlockFiller>
      )}
      <PdfUploader
        id={`contentBlockPdfUploader${_id}`}
        onChange={changeHandler}
        onDelete={deleteHandler}
        name={`contentBlockPdfUploader${_id}`}
        value={content.file}
      />
      <ErrorMsg show={touched?.file && !!errors?.file} margin='5px 0 5px'>{errors?.file}</ErrorMsg>
    </Style.ContentBlockHolder>
  );
};

export default memo(PdfContentBlock);
