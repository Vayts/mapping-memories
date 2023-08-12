import React from 'react';
import { IInfoWindowContentProps } from '@src/pages/MapPage/MemorialMarker/InfoWindowContent/types';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/app/selectors';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const InfoWindowContent: React.FC<IInfoWindowContentProps> = ({ marker }) => {
  const {
    description,
    title,
    img,
    address,
    link,
    img_source,
  } = marker;
  const { t } = useTranslation();
  const locale = useAppSelector(selectLocale);
  
  return (
    <S.Content>
      {img ? (
        <S.PhotoWrapper>
          <S.Photo
            src={img}
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
          {img_source
            ? (
              <S.InfoLink
                target='_blank'
                to={img_source}
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
