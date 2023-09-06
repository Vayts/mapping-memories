import { ReactNode } from 'react';

export interface IMenu {
  icon?: string,
  size?: number,
  children: ReactNode
}

export interface IMenuStyle {
  isOpen: boolean,
}
