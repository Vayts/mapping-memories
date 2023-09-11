import React from 'react';
import { STATIC_HREF } from '@constants/app';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const PageNotFound: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <S.PageNotFoundWrapper>
      <S.PageNotFoundContent>
        <S.PageNotFoundText >{t('pageNotFoundUpperText')}</S.PageNotFoundText>
        <S.PageNotFoundImg src={`${STATIC_HREF}/404.svg`}/>
        <S.PageNotFoundDownContent>
          <S.PageNotFoundText>{t('pageNotFoundDownText')}</S.PageNotFoundText>
        </S.PageNotFoundDownContent>
      </S.PageNotFoundContent>
    </S.PageNotFoundWrapper>
  );
};

export default PageNotFound;
