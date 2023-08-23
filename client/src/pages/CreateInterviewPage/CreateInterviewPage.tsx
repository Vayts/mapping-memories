import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICreateInterviewMain, ICreateInterviewContentBlock } from '@src/types/createInterviewTypes';
import MainInfo from '@src/pages/CreateInterviewPage/MainInfo/MainInfo';
import Title from '@src/components/UI/Title/Title';
import ContentBlocks from '@src/pages/CreateInterviewPage/ContentBlocks/ContentBlocks';
import { getCreateInterviewTotalValidation } from '@src/validation/createInterview.validation';
import { getNotification } from '@src/notification/notifications';
import Button from '@src/components/UI/Button/Button';
import { getCreateInterviewDTO } from '@helpers/createInterview.helper';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectCreateInterviewLoading } from '@src/store/createInterview/selectors';
import { addInterviewRequest } from '@src/store/createInterview/actions';
import * as S from './style';

const initialMain: ICreateInterviewMain = {
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
const CreateInterviewPage: React.FC = () => {
  const [mainInfo, setMainInfo] = useState<ICreateInterviewMain>(initialMain);
  const [contentBlocks, setContentBlocks] = useState<ICreateInterviewContentBlock[]>([]);
  const isLoading = useAppSelector(selectCreateInterviewLoading);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (getCreateInterviewTotalValidation(mainInfo, contentBlocks)) {
      getNotification('Все супер');
      const values = getCreateInterviewDTO(mainInfo, contentBlocks);
      dispatch(addInterviewRequest(values));
    }
  };

  return (
    <S.CreateInterviewWrapper>
      <S.CreateInterviewControlsWrapper>
        <Title
          margin='0'
          fz={30}
        >
          {t('addInterview')}
        </Title>
        <Button
          text={t('send')}
          clickHandler={submitHandler}
          isLoading={isLoading}
        />
      </S.CreateInterviewControlsWrapper>
      <MainInfo
        mainInfo={mainInfo}
        setMainInfo={setMainInfo}
      />
      <ContentBlocks
        contentBlocks={contentBlocks}
        setContentBlocks={setContentBlocks}
      />
    </S.CreateInterviewWrapper>
  );
};

export default memo(CreateInterviewPage);
