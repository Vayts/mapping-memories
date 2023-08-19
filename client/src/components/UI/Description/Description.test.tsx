import { render } from '@testing-library/react';
import React from 'react';
import Description from '@src/components/UI/Description/Description';

describe('Description', () => {
  it('should render Description with correct text', () => {
    const text = 'Test Description';
    const { getByText } = render(<Description>{text}</Description>);
    const description = getByText(text);
    expect(description).toBeInTheDocument();
  });
});
