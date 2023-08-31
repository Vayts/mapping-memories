import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IHeaderProps } from '@src/components/Header/types';
import { NavLink } from 'react-router-dom';
import LanguageSwitcher from '@src/components/LanguageSwitcher/LanguageSwitcher';
import * as S from './style';

const Header: React.FC<IHeaderProps> = ({ isFixed }) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const { t } = useTranslation();
  
  const closeNav = () => {
    setNavOpen(false);
  };
  
  return (
    <S.HeaderWrapper isOpen={isNavOpen} isFixed={isFixed}>
      <S.HeaderContent>
        <NavLink
          to='/'
        >
          <S.Logo src='../assets/img/logo.svg' alt='mapping memories of ukraine logo'/>
        </NavLink>
        <S.BurgerButton className='icon-burger' onClick={() => setNavOpen(!isNavOpen)}/>
        <S.Navigation isOpen={isNavOpen}>
          <S.NavList>
            <S.NavItem>
              <S.NavigationLink
                onClick={closeNav}
                to='/'
              >
                {t('main')}
              </S.NavigationLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavigationLink
                onClick={closeNav}
                to='/map'
              >
                {t('mapOfMemorials')}
              </S.NavigationLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavigationLink
                onClick={closeNav}
                to='/interviews'
              >
                {t('interviews')}
              </S.NavigationLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavigationLink
                onClick={closeNav}
                to='/art-projects'
              >
                {t('artProjects')}
              </S.NavigationLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavigationLink
                onClick={closeNav}
                to='/special-projects'
              >
                {t('specialProjects')}
              </S.NavigationLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavigationLink
                onClick={closeNav}
                to='/about_us'
              >
                {t('aboutUs')}
              </S.NavigationLink>
            </S.NavItem>
          </S.NavList>
          <LanguageSwitcher/>
        </S.Navigation>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
};

export default Header;
