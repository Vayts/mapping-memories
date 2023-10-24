import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICreatePublicationMain, ICreatePublicationContentBlock } from '@src/types/createPublication.types';
import Title from '@src/components/UI/Title/Title';
import { getCreatePublicationTotalValidation } from '@src/validation/createPublication.validation';
import Button from '@src/components/UI/Button/Button';
import { useAppDispatch } from '@src/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { getCreatePublicationDTO } from '@helpers/createPublication.helper';
import MainInfo from '@src/components/MainInfo/MainInfo';
import ContentBlocks from '@src/components/ContentBlocks/ContentBlocks';
import { createPublication } from '@src/store/publications/thunks';
import { errorManager } from '@helpers/error.helper';
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
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (getCreatePublicationTotalValidation(mainInfo, contentBlocks)) {
      const values = getCreatePublicationDTO(mainInfo, contentBlocks);
      dispatch(createPublication(values))
        .unwrap()
        .then(() => navigate('/mapmem-admin/publications'))
        .catch(errorManager)
        .finally(() => setLoading(false));
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
