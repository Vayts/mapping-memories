import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICreatePublicationMain, ICreatePublicationContentBlock } from '@src/types/createPublication.types';
import Title from '@src/components/UI/Title/Title';
import { getCreatePublicationTotalValidation } from '@src/validation/createPublication.validation';
import Button from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectCreatePublicationLoading, selectPublicationHasBeenAdded } from '@src/store/createPublication/selectors';
import { addPublicationRequest } from '@src/store/createPublication/actions';
import { setPublicationHasBeenAdded } from '@src/store/createPublication/reducer';
import { useNavigate } from 'react-router-dom';
import { getCreatePublicationDTO } from '@helpers/createPublication.helper';
import MainInfo from '@src/components/MainInfo/MainInfo';
import ContentBlocks from '@src/components/ContentBlocks/ContentBlocks';
import * as S from './style';

const initialMain: ICreatePublicationMain = {
  title: {
    uk: '',
    en: '',
  },
  type: '',
  photo: null,
  description: {
    uk: '',
    en: '',
  },
  errors: {},
  touched: {},
};
const CreatePublicationPage: React.FC = () => {
  const [mainInfo, setMainInfo] = useState<ICreatePublicationMain>(initialMain);
  const [contentBlocks, setContentBlocks] = useState<ICreatePublicationContentBlock[]>([]);
  const isLoading = useAppSelector(selectCreatePublicationLoading);
  const hasBeenAdded = useAppSelector(selectPublicationHasBeenAdded);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    if (hasBeenAdded) {
      navigate('/mapmem-admin/publications');
    }
    
    return () => {
      dispatch(setPublicationHasBeenAdded(false));
    };
  }, [hasBeenAdded]);
  
  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (getCreatePublicationTotalValidation(mainInfo, contentBlocks)) {
      const values = getCreatePublicationDTO(mainInfo, contentBlocks);
      dispatch(addPublicationRequest(values));
    }
  };

  return (
    <S.CreatePublicationWrapper>
      
      <S.CreatePublicationControlsWrapper>
        <Title
          margin='0'
          fz={30}
        >
          {t('addPublication')}
        </Title>
        <Button
          text={t('send')}
          clickHandler={submitHandler}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </S.CreatePublicationControlsWrapper>
      
      <MainInfo
        mainInfo={mainInfo}
        setMainInfo={setMainInfo}
      />
      
      <ContentBlocks
        contentBlocks={contentBlocks}
        setContentBlocks={setContentBlocks}
      />
    </S.CreatePublicationWrapper>
  );
};

export default memo(CreatePublicationPage);
