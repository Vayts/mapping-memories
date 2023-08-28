import React from 'react';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import * as Style from '../style';

const PdfContentBlock: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Style.ContentBlockHolder>
      <Title>{t('pdf')}</Title>
    </Style.ContentBlockHolder>
  );
};

export default PdfContentBlock;
