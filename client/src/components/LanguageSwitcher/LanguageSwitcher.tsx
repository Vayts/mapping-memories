import React from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/app/selectors';
import { useTranslation } from 'react-i18next';
import { LocaleType } from '@src/types/types';
import { setLocale } from '@src/store/app/reducer';
import * as S from './style';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = useAppSelector(selectLocale);
  const dispatch = useAppDispatch();
  
  const changeLanguageHandler = (value: LocaleType) => {
    i18n.changeLanguage(value).then(() => {
      dispatch(setLocale(value));
    });
  };
  
  return (
    <S.LanguageSwitcherWrapper>
      <S.LanguageSwitcherItem onClick={() => changeLanguageHandler('uk')} isActive={locale === 'uk'}>Укр</S.LanguageSwitcherItem>
      <S.LanguageSwitcherDivider>/</S.LanguageSwitcherDivider>
      <S.LanguageSwitcherItem onClick={() => changeLanguageHandler('en')} isActive={locale === 'en'}>Eng</S.LanguageSwitcherItem>
    </S.LanguageSwitcherWrapper>
  );
};

export default LanguageSwitcher;
