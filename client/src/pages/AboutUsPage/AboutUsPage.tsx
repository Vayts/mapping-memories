import React from 'react';
import { useTranslation } from 'react-i18next';
import Title from '@src/components/UI/Title/Title';
import { STATIC_HREF } from '@constants/app';
import Description from '@src/components/UI/Description/Description';
import * as S from './style';

const AboutUsPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <S.AboutUsBanner>
        <img src={`${STATIC_HREF}/banner_main.svg`} alt="main banner" />
      </S.AboutUsBanner>
      <Title>{t('aboutUs')}</Title>
      <Description fz={16}>{t('aboutUsText1')}</Description>
      <Description fz={16}>{t('aboutUsText2')}</Description>
      <Description fz={16}>{t('aboutUsText3')}</Description>
      <Description fz={16}>{t('aboutUsText4')}</Description>
      <Title margin='20px 0'>{t('team')}</Title>
    </>
  );
};

export default AboutUsPage;
