import React from 'react';
import DefaultTFuncReturn from 'i18next';

export interface IButton {
  margin?: string,
  padding?: string,
  fz?: number,
  fw?: number,
  text?: string | typeof DefaultTFuncReturn,
  height?: string,
  width?: string,
  styleType?: 'transparent' | 'primary' | 'cancel' | 'confirm' | 'reverse',
  clickHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  disabled?: boolean,
  isLoading?: boolean,
  icon?: string,
  br?: string,
  type?: 'button' | 'submit',
  children?: React.ReactNode | string,
}

export interface IButtonStyle {
  margin?: string,
  padding?: string,
  fz?: number,
  fw?: number,
  height?: string,
  width?: string,
  disabled?: boolean,
  br?: string,
  styleType?: 'transparent' | 'primary' | 'cancel' | 'confirm' | 'reverse',
}
