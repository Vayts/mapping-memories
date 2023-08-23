import React, { Ref } from 'react';
import { LocaleType } from '@src/types/types';
import DefaultTFuncReturn from 'i18next';

export interface ITextArea {
	id: string,
	name: string,
	margin?: string,
	padding?: string,
	fz?: number,
	height?: string,
	width?: string,
	value: string,
	label?: string | typeof DefaultTFuncReturn,
	placeholder?: string | typeof DefaultTFuncReturn,
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
	isValid?: boolean,
	refValue?: Ref<HTMLInputElement> | null,
	min?: number,
	max?: number,
    locale?: LocaleType | undefined,
}

export interface ITextAreaStyle {
	margin?: string,
	padding?: string,
	fz?: number,
	height?: string,
	width?: string,
	isValid?: boolean,
}
