import React, { ChangeEvent, useCallback, useEffect } from 'react';
import Title from '@src/components/UI/Title/Title';
import Button from '@src/components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { Search } from '@src/components/UI/Search/Search';
import { useTranslation } from 'react-i18next';
import { selectAdminPublicationsSearch } from '@src/store/adminPublications/selectors';
import { getAllPublicationBySearchRequest, getAllPublications } from '@src/store/adminPublications/action';
import { setAdminPublicationsSearch } from '@src/store/adminPublications/reducer';
import PublicationsTable from '@src/pages/AdminPublicationsPage/PublicationsTable/PublicationsTable';
import * as S from './style';

const AdminPublications: React.FC = () => {
  const search = useAppSelector(selectAdminPublicationsSearch);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(getAllPublications());
  }, []);

  const navigateToAddHandler = () => {
    navigate('/mapmem-admin/publications/add');
  };
  
  const onSearchChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      dispatch(getAllPublications());
    }
    
    dispatch(setAdminPublicationsSearch(e.target.value));
  }, []);
  
  const onSearchClickHandler = useCallback(() => {
    dispatch(getAllPublicationBySearchRequest());
  }, []);
  
  return (
    <S.AdminPublicationsWrapper>
      <S.AdminHeader>
        <Title>Публікації</Title>
        <S.AdminHeaderControls>
          <Button
            clickHandler={navigateToAddHandler}
            text={t('addPublication')}
          />
          <Search id='publicationsSearch' name='publicationsSearch' value={search} onSearch={onSearchClickHandler} onChange={onSearchChangeHandler}/>
        </S.AdminHeaderControls>
      </S.AdminHeader>
      <PublicationsTable/>
    </S.AdminPublicationsWrapper>
  );
};

export default AdminPublications;
