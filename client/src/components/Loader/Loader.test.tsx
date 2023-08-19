import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { THEMES } from '@constants/themes';
import { Loader } from '@src/components/Loader/Loader';
import React from 'react';

describe('Loader', () => {
  jest.mock('styled-components', () => ({
    useTheme: () => {
      return {
        primary: '#ff000',
      };
    },
  }));
	
  it('should render loader', () => {
    const { getByTestId } = render(<ThemeProvider theme={THEMES.light}><Loader/></ThemeProvider>);
    const loader = getByTestId('loaderId');
    expect(loader).toBeInTheDocument();
  });
});
