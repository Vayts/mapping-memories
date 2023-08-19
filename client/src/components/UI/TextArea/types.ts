import React, { Ref } from 'react';
import { DefaultTFuncReturn } from 'i18next';

export interface ITextArea {
	id: string,
	name: string,
	margin?: string,
	padding?: string,
	fz?: number,
	height?: string,
	width?: string,
	value: string,
	label?: string | DefaultTFuncReturn,
	placeholder?: string | DefaultTFuncReturn,
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
	isValid?: boolean,
	refValue?: Ref<HTMLInputElement> | null,
	min?: number,
	max?: number,
}

export interface ITextAreaStyle {
	margin?: string,
	padding?: string,
	fz?: number,
	height?: string,
	width?: string,
	isValid?: boolean,
}
