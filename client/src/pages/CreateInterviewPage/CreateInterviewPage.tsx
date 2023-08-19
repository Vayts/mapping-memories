import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICreateInterviewMain, ICreateRecipeContentBlock } from '@src/types/createInterviewTypes';
import MainInfo from '@src/pages/CreateInterviewPage/MainInfo/MainInfo';
import Title from '@src/components/UI/Title/Title';
import ContentBlocks from '@src/pages/CreateInterviewPage/ContentBlocks/ContentBlocks';
import * as S from './style';

const initialMain: ICreateInterviewMain = {
  title: {
    uk: '',
    en: '',
  },
  mainPhoto: null,
  description: {
    uk: '',
    en: '',
  },
  errors: {},
  touched: {},
};

const CreateInterviewPage: React.FC = () => {
  const [mainInfo, setMainInfo] = useState<ICreateInterviewMain>(initialMain);
  const [contentBlocks, setContentBlocks] = useState<ICreateRecipeContentBlock[]>([]);
  const { t } = useTranslation();
  
  return (
    <S.CreateInterviewWrapper>
      <Title
        margin='0 0 20px'
        fz={30}
      >
        {t('addInterview')}
      </Title>
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
