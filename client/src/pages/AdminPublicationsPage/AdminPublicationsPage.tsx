import React, { ChangeEvent, useCallback, useState } from 'react';
import Title from '@src/components/UI/Title/Title';
import Button from '@src/components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { Search } from '@src/components/UI/Search/Search';
import { useTranslation } from 'react-i18next';
import PublicationsTable from '@src/pages/AdminPublicationsPage/PublicationsTable/PublicationsTable';
import { getAllPublications, getAllPublicationsByTitle } from '@src/store/publications/thunks';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

const AdminPublicationsPage: React.FC = () => {
  const isLoading = useAppSelector((state) => state.publications.isLoading);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const navigateToAddHandler = () => {
    navigate('/mapmem-admin/publications/add');
  };
  
  const onSearchChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);
  
  const onSearchClickHandler = () => {
    dispatch(getAllPublicationsByTitle(search));
  };
  
  const handleRefresh = () => {
    dispatch(getAllPublications());
  };
  
  return (
    <div>
      <S.AdminHeader>
        <S.AdminTitleWrapper>
          <Title>{t('publications')}</Title>
          <S.AdminRefreshButton className='icon-refresh' onClick={handleRefresh}/>
        </S.AdminTitleWrapper>
        <S.AdminHeaderControls>
          <Button
            clickHandler={navigateToAddHandler}
            text={t('addPublication')}
          />
          <Search id='publicationsSearch' name='publicationsSearch' value={search} onSearch={onSearchClickHandler} onChange={onSearchChangeHandler}/>
        </S.AdminHeaderControls>
      </S.AdminHeader>
      {isLoading ? <Loader size={50}/> : <PublicationsTable/>}
    </div>
  );
};

export default AdminPublicationsPage;
