import styled from 'styled-components';
import { ILanguageSwitcherStyle } from '@src/components/LanguageSwitcher/types';
import { RESPONSIVE } from '@constants/style';

export const LanguageSwitcherWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 20px;
  height: 100%;

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    margin-left: 20px;
    margin-top: 0;
  }
`;

export const LanguageSwitcherItem = styled.p<ILanguageSwitcherStyle>`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme, isActive }) => (isActive ? theme.accentColor : theme.lightBgColor)};
  cursor: pointer;
  transition: all 0.1s;
  user-select: none;
  height: 100%;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme, isActive }) => (isActive ? theme.accentColor : theme.accentColorHover)};
  }

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    font-size: 16px;
  }
`;

export const LanguageSwitcherDivider = styled.p`
  margin: 0;
  font-weight: 700;
  height: 100%;
  color: ${({ theme }) => theme.accentColorHover};
  display: flex;
  align-items: center;
`;
