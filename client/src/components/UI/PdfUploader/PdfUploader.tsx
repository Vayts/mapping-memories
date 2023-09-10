import React, { ChangeEvent, useCallback, useRef } from 'react';
import Button from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { IPdfUploaderProps } from '@src/components/UI/PdfUploader/types';
import { getNotification } from '@src/notification/notifications';
import * as S from './style';

const PdfUploader: React.FC<IPdfUploaderProps> = ({
  onDelete,
  onChange,
  margin,
  name,
  id,
  value,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  
  const clickHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        getNotification(t('pdfTypeError'), 'error');
        return false;
      }
      onChange(e);
    }
    e.target.value = '';
  }, []);
  
  return (
    <S.PdfUploaderWrapper margin={margin}>
      <S.PdfContentWrapper htmlFor={id}>
        <Button
          clickHandler={clickHandler}
          text={t('choosePdfFile')}
        />
        {value && <span>{value?.name}</span>}
      </S.PdfContentWrapper>
      {value && <S.PdfDeleteButton className='icon-cross' onClick={onDelete}/>}
      <S.PdfInput ref={fileInputRef} onChange={onChangeHandler} id={id} name={name}/>
    </S.PdfUploaderWrapper>
  );
};

export default PdfUploader;
