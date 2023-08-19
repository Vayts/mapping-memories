import React, { Ref } from 'react';
import DefaultTFuncReturn from 'i18next';
import { LocaleType } from '@src/types/types';

export interface IInput {
  id: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name: string,
  margin?: string,
  padding?: string,
  fz?: number,
  height?: string,
  width?: string,
  value: string,
  type?: 'text' | 'number' | 'password',
  isSecure?: boolean,
  label?: string | typeof DefaultTFuncReturn,
  placeholder?: string | typeof DefaultTFuncReturn,
  isValid?: boolean,
  refValue?: Ref<HTMLInputElement> | null,
  max?: number,
  min?: number,
  locale?: LocaleType | undefined,
}

export interface IInputStyle {
  margin?: string,
  padding?: string,
  fz?: number,
  height?: string,
  width?: string,
  isValid?: boolean,
}
