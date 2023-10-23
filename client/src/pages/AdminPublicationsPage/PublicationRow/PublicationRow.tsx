import React, { memo } from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { PUBLICATION_TYPE_COLOR } from '@constants/publication';
import Tag from '@src/components/Tag/Tag';
import { Menu } from '@src/components/UI/Menu/Menu';
import { IPublicationRowProps } from '@src/pages/AdminPublicationsPage/PublicationRow/types';
import PublicationContextMenu from '@src/pages/AdminPublicationsPage/PublicationContextMenu/PublicationContextMenu';
import * as S from './style';

const PublicationRow: React.FC<IPublicationRowProps> = ({ publication }) => {
  const { index, title, description, createdAt, type, isFavorite } = publication;
  const { t } = useTranslation();
  
  return (
    <S.PublicationRowWrapper>
      <S.PublicationIsFavoriteTd isFavorite={isFavorite}>
        {index}
      </S.PublicationIsFavoriteTd>
      <td>
        <p>
          {title.uk}
        </p>
      </td>
      <td>
        <p>
          {description.uk}
        </p>
      </td>
      <td>
        <Tag text={t(type)} color={PUBLICATION_TYPE_COLOR[type]}/>
      </td>
      <td>
        {format(new Date(createdAt), 'dd.MM.yyyy')}
      </td>
      <td>
        <Menu>
          <PublicationContextMenu publication={publication}/>
        </Menu>
      </td>
    </S.PublicationRowWrapper>
  );
};

export default memo(PublicationRow);
