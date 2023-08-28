import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICreatePublicationMain, ICreatePublicationContentBlock } from '@src/types/createPublicationTypes';
import Title from '@src/components/UI/Title/Title';
import { getCreatePublicationTotalValidation } from '@src/validation/createPublication.validation';
import { getNotification } from '@src/notification/notifications';
import Button from '@src/components/UI/Button/Button';
import { getCreatePublicationDTO } from '@helpers/createPublication.helper';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectCreatePublicationLoading } from '@src/store/createPublication/selectors';
import { addPublicationRequest } from '@src/store/createPublication/actions';
import MainInfo from '@src/pages/CreatePublication/MainInfo/MainInfo';
import ContentBlocks from '@src/pages/CreatePublication/ContentBlocks/ContentBlocks';
import * as S from './style';

const initialMain: ICreatePublicationMain = {
  title: {
    uk: '',
    en: '',
  },
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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (getCreatePublicationTotalValidation(mainInfo, contentBlocks)) {
      getNotification('Все супер');
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
