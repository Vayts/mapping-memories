import React from 'react';
import Title from '@src/components/UI/Title/Title';
import * as S from './style';

const AdminMenu: React.FC = () => {
  return (
    <S.AminMenuWrapper>
      <Title fz={25}>admin</Title>
      <S.AdminList>
        <S.AdminListItem>
          <S.AdminNavLink to='/mapmem-admin/memorials'>
            <span className='icon-memorial-type'/>
            Типи меморіалів
          </S.AdminNavLink>
        </S.AdminListItem>
        <S.AdminListItem>
          <S.AdminNavLink to='/mapmem-admin/memorials'>
            <span className='icon-cities'/>
            Маркери міст
          </S.AdminNavLink>
        </S.AdminListItem>
        <S.AdminListItem>
          <S.AdminNavLink to='/mapmem-admin/memorials'>
            <span className='icon-markers'/>
            Меморіали
          </S.AdminNavLink>
        </S.AdminListItem>
        <S.AdminListItem>
          <S.AdminNavLink to='/mapmem-admin/publications'>
            <span className='icon-publications'/>
            Публікації
          </S.AdminNavLink>
        </S.AdminListItem>
      </S.AdminList>
    </S.AminMenuWrapper>
  );
};

export default AdminMenu;
