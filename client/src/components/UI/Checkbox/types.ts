import React from 'react';

export interface ICheckbox {
  label: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string | number,
  id: string,
  checked: boolean,
}

export interface ICheckboxStyle {
  checked: boolean,
}
