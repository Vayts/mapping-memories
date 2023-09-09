import { ChangeEvent, Ref } from 'react';

export interface ISearch {
	id: string,
	name: string,
	margin?: string,
	fz?: number,
	height?: string,
	width?: string,
	value: string,
	placeholder?: string,
	onSearch: (value: string) => void,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	refValue?: Ref<HTMLInputElement> | null,
  isLoading?: boolean,
  disabled?: boolean,
}

export interface ISearchStyle {
	margin?: string,
	fz?: number,
	height?: string,
	width?: string,
  disabled?: boolean,
}
