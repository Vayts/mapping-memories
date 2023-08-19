import DefaultTFuncReturn from 'i18next';

export interface ISelect {
  id: string,
  name: string,
  margin?: string,
  padding?: string,
  fz?: number,
  height?: string,
  width?: string,
  valueArr: string[],
  selected: string,
  label?: string | typeof DefaultTFuncReturn,
  placeholder?: string | typeof DefaultTFuncReturn,
  onChange: (value: string) => void,
  isValid?: boolean,
  searchable?: boolean,
  isLoading?: boolean,
}

export interface ISelectStyle {
  margin?: string,
  padding?: string,
  fz?: number,
  height?: string,
  width?: string,
  isValid?: boolean,
  isOpen?: boolean,
}
