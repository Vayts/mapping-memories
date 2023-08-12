import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const Header: React.FC = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const { t } = useTranslation();
  
  return (
    <S.HeaderWrapper>
      <S.HeaderContent>
        <S.Logo src='../assets/img/logo.svg' alt='mapping memories of ukraine logo'/>
        <S.BurgerButton className='icon-burger' onClick={() => setNavOpen(!isNavOpen)}/>
        <S.Navigation isOpen={isNavOpen}>
          <S.NavList>
            <S.NavItem>
              <S.NavigationLink
                to='/map'
              >
                {t('mapOfMemorials')}
              </S.NavigationLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavigationLink
                to='/interviews'
              >
                {t('interviews')}
              </S.NavigationLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavigationLink
                to='/admin/create-interview'
              >
                {t('artProjects')}
              </S.NavigationLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavigationLink
                to='/special-projects'
              >
                {t('specialProjects')}
              </S.NavigationLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavigationLink
                to='/about_us'
              >
                {t('aboutUs')}
              </S.NavigationLink>
            </S.NavItem>
          </S.NavList>
        </S.Navigation>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
};

export default Header;
