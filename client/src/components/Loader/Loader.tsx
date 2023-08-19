import React, { FC } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { ILoader } from '@src/components/Loader/types';
import { useTheme } from 'styled-components';
import { THEMES } from '@constants/themes';
import { LoaderWrapper } from './style';

type Theme = typeof THEMES.light;

export const Loader: FC<ILoader> = ({ color, size }) => {
  const theme = useTheme() as Theme;
	
  return (
    <LoaderWrapper data-testid='loaderId'>
      <ClipLoader color={color || theme.primaryColor} loading size={size || 100} />
    </LoaderWrapper>
  );
};
