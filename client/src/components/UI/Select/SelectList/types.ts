import React from 'react';

export interface ISelectList {
  isOpen: boolean,
  onClick: (e: React.MouseEvent) => void,
  searchable?: boolean,
  valueArr: string[],
  inputValue: string,
}
