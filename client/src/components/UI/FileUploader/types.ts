import React from 'react';

export interface IFileUploader {
	id: string,
	value: string | null,
	text?: string,
	isValid?: boolean,
	height?: string,
	width?: string,
	margin?: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	name: string,
	fz?: number,
}

export interface IFileUploaderStyle {
	height?: string,
	width?: string,
	isValid?: boolean,
	margin?: string,
	fz?: number,
	value?: string | null,
	isActive?: boolean,
}
