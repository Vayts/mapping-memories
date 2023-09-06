import styled, { css } from 'styled-components';
import { RESPONSIVE } from '@constants/style';
import { IHeaderStyle } from '@src/components/Header/types';
import { NavLink } from 'react-router-dom';

export const HeaderWrapper = styled.div<IHeaderStyle>`
  border-bottom: 1px solid #e8e8e8;
  height: 60px;
  position: relative;
  z-index: ${({ isOpen }) => (isOpen ? 12 : 10)};;
  
  ${({ isFixed }) => {
    if (isFixed) {
      return css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      `;
    }
  }}
`;

export const HeaderContent = styled.div`
  height: 100%;
  padding: 0 35px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: #fff;
`;

export const Logo = styled.img`
  height: 30px;

  @media screen and (min-width: ${RESPONSIVE.tabletL}) {
    height: 40px;
  }
`;

export const BurgerButton = styled.div`
  @media screen and (min-width: ${RESPONSIVE.tabletL}) {
    display: none;
  }
`;

export const Navigation = styled.nav<IHeaderStyle>`
  position: absolute;
  left: 0;
  z-index: -1;
  background-color: #fff;
  width: 100vw;
  display: flex;
  align-items: center;
  padding: 10px 0 30px;
  border-top: 1px solid #d1d1d1;
  box-shadow: ${({ isOpen }) => (isOpen ? '3px 10px 15px rgba(0, 0, 0, 0.2)' : 'unset')};
  transform: ${({ isOpen }) => (isOpen ? 'unset' : 'translateY(-100%)')};
  top: ${({ isOpen }) => (isOpen ? '100%' : '100%')};
  transition: all 0.2s;
  flex-direction: column;

  @media screen and (min-width: ${RESPONSIVE.tabletL}) {
    z-index: unset;
    position: unset;
    transform: unset;
    left: 0;
    flex-direction: row;
    justify-content: flex-start;
    top: unset;
    background-color: unset;
    box-shadow: unset;
    width: unset;
    padding: 0;
    border-top: unset;
    height: 100%;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  max-height: calc(100vh - 60px);
  
  @media screen and (min-width: ${RESPONSIVE.tabletL}) {
    display: flex;
    width: 100%;
    height: 100%;
    max-height: unset;
    overflow: unset;
  }
`;

export const NavItem = styled.li`
  padding: 0 10px;
  font-weight: 500;
  font-size: 18px;
  text-align: left;

  @media screen and (min-width: ${RESPONSIVE.tabletL}) {
    height: 100%;
    font-size: 14px;
    margin-left: 2px;
    font-weight: 400;
    padding: 0;
    text-align: center;
  }

  @media screen and (min-width: ${RESPONSIVE.tabletL}) {
    height: 100%;
    font-size: 14px;
    margin-left: 2px;
    font-weight: 400;
    padding: 0;
    text-align: center;
    text-transform: uppercase;
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    font-size: 14px;
    font-weight: 600;
    margin-left: 10px;
    letter-spacing: 1px;
  }
`;

export const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.lightTxtColor};
  transition: all 0.2s;
  height: 100%;
  width: 100%;
  display: block;
  padding: 15px 0;
  position: relative;
  border-bottom: solid 1px rgba(0, 0, 0, 0.12);

  @media screen and (min-width: ${RESPONSIVE.tabletL}) {
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: unset;

    &::before {
      content: '';
      width: 100%;
      height: 4px;
      position: absolute;
      bottom: 0;
      background-color: transparent;
      transition: all 0.2s;
    }

    &:hover {
      color: #000000;
      background-color: ${({ theme }) => theme.brightBgColor};

      &::before {
        background-color: ${({ theme }) => theme.accentColorHover};
      }
    }

    &.active {
      color: #000000;
      background-color: ${({ theme }) => theme.brightBgColor};

      &::before {
        background-color: ${({ theme }) => theme.accentColor};
      }
    }
  }
`;
