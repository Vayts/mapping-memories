import { render } from '@testing-library/react';
import React from 'react';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import { ThemeProvider } from 'styled-components';
import { THEMES } from '@constants/themes';

describe('Error Message', () => {
  it('should render with correct text', () => {
    const text = 'Test Error';
    const { getByText } = render(
      <ThemeProvider theme={THEMES.light}>
        <ErrorMsg show>{text}</ErrorMsg>
      </ThemeProvider>,
			
    );
    const errorMsg = getByText(text);
    expect(errorMsg).toBeInTheDocument();
  });
  it('should render with correct styles', () => {
    const text = 'Test Error';
    const { getByTestId } = render(<ErrorMsg show={false} margin='5px 10px'>{text}</ErrorMsg>);
    const errorMsg = getByTestId('errorMsg');
    expect(errorMsg).toHaveStyle('margin: 5px 10px');
  });
  it('Shouldn"t be rendered with text', () => {
    const text = 'Test Error';
    const { getByTestId } = render(<ErrorMsg show={false}>{text}</ErrorMsg>);
    const errorMsg = getByTestId('errorMsg');
    expect(errorMsg.childNodes.length as number).toBe(0);
  });
});
