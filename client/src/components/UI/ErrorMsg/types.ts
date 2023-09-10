import React from 'react';

export interface IErrorMsg {
  show: boolean,
  margin?: string,
  align?: 'center' | 'right' | 'left',
  children?: React.ReactNode
}

export interface IErrorWrapperStyle {
  margin?: string,
  align?: 'center' | 'right' | 'left',
}
