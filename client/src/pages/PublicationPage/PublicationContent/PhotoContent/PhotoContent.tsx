import React from 'react';
import { IPhotoContentProps } from '@src/pages/PublicationPage/PublicationContent/PhotoContent/types';
import { BASE_URL } from '@src/api/axios';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/core/selectors';
import Description from '@src/components/UI/Description/Description';
import { useTranslation } from 'react-i18next';
import * as S from './style';
import { PhotoTextWrapper } from './style';

const PhotoContent: React.FC<IPhotoContentProps> = ({ contentBlock }) => {
  const locale = useAppSelector(selectLocale);
  const { content } = contentBlock;
  const { photo, source, description } = content;
  const { t } = useTranslation();
  
  return (
    <S.PhotoContentWrapper>
      <S.PhotoContentImg src={`${BASE_URL}/file/download/photo?id=${photo}`}/>
      {source && <S.PhotoSourceText target='_blank' href={source}>{t('source')}</S.PhotoSourceText>}
      <PhotoTextWrapper>
        {description && (
          <Description margin='5px 0 10px' align='center'>
            {description[locale]}
          </Description>
        )}
      </PhotoTextWrapper>
    </S.PhotoContentWrapper>
  );
};

export default PhotoContent;
