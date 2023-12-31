import React, { memo } from 'react';
import { format } from 'date-fns';
import Title from '@src/components/UI/Title/Title';
import Description from '@src/components/UI/Description/Description';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/core/selectors';
import Tag from '@src/components/Tag/Tag';
import { PUBLICATION_TYPE_COLOR } from '@constants/publication';
import { useTranslation } from 'react-i18next';
import { LOCALE_MAP } from '@constants/locale';
import { BASE_URL } from '@src/api/api';
import * as S from './style';
import { IPublicationCardProps } from './types';

const PublicationCard: React.FC<IPublicationCardProps> = ({ publication }) => {
  const { photo, title, description, createdAt, type, _id } = publication;
  const locale = useAppSelector(selectLocale);
  const { t } = useTranslation();
  
  return (
    <S.CardWrapper to={`/publication/${_id}`}>
      <S.CardImg src={`${BASE_URL}/file/download/photo?id=${photo}`} loading='lazy'/>
      <S.CardInfo>
        <S.CardDate>{format(new Date(createdAt), 'dd MMM yyyy', { locale: LOCALE_MAP[locale] })}</S.CardDate>
        <S.CardTextInfo>
          <S.CardTitleWrapper>
            <Title
              fz={18}
              fw={600}
              margin='0'
            >
              {title[locale]}
            </Title>
            <span className='icon-link'/>
          </S.CardTitleWrapper>
          <Description
            fz={14}
            margin='10px 0'
          >
            {description[locale]}
          </Description>
        </S.CardTextInfo>
        <Tag text={t(type)} color={PUBLICATION_TYPE_COLOR[type]}/>
      </S.CardInfo>
    </S.CardWrapper>
  );
};

export default memo(PublicationCard);
