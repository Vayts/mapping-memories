import React from 'react';
import { IInfoWindowContentProps } from '@src/pages/MapPage/MemorialMarker/InfoWindowContent/types';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/app/selectors';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '@src/api/axios';
import * as S from './style';

const InfoWindowContent: React.FC<IInfoWindowContentProps> = ({ marker }) => {
  const {
    description,
    title,
    photo,
    address,
    link,
    photo_source,
  } = marker;
  const { t } = useTranslation();
  const locale = useAppSelector(selectLocale);
  
  return (
    <S.Content>
      
      {photo ? (
        <S.PhotoWrapper>
          <S.Photo
            src={`${BASE_URL}/file/download/photo?id=${photo}`}
            alt={title[locale]}
          />
        </S.PhotoWrapper>
      ) : null}
      
      <S.InfoData>
        
        <S.InfoTitle>{title[locale]}</S.InfoTitle>
        {address ? <S.InfoAddress>{address[locale]}</S.InfoAddress> : null}
        <S.InfoDescription>{description[locale]}</S.InfoDescription>
        
        <S.InfoLinks>
          {link ? <S.InfoLink to={link}>{t('readMore')}</S.InfoLink> : null}
          {photo_source
            ? (
              <S.InfoLink
                target='_blank'
                to={photo_source}
              >
                {t('imgSource')}
              </S.InfoLink>
            ) : null}
        </S.InfoLinks>
      </S.InfoData>
    </S.Content>
  );
};

export default InfoWindowContent;
