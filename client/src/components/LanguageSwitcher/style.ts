import styled from 'styled-components';
import { ILanguageSwitcherStyle } from '@src/components/LanguageSwitcher/types';

export const LanguageSwitcherWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 20px;
  height: 100%;
`;

export const LanguageSwitcherItem = styled.p<ILanguageSwitcherStyle>`
  margin: 0;
  font-size: 16px;
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
`;

export const LanguageSwitcherDivider = styled.p`
  margin: 0;
  font-weight: 700;
  height: 100%;
  color: ${({ theme }) => theme.accentColorHover};
  display: flex;
  align-items: center;
`;
