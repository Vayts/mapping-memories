import React from 'react';

export interface IDescription {
	fz?: number,
	margin?: string,
	color?: string,
	height?: string,
	align?: 'center' | 'left' | 'right',
    children?: React.ReactNode,
}
