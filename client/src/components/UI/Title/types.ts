import React from 'react';

export interface ITitle {
  fz?: number,
  margin?: string,
  padding?: string,
  color?: string,
  height?: string,
  align?: 'center' | 'right' | 'left',
  fw?: number,
  children: React.ReactNode;
}
