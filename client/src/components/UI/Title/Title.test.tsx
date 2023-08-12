import { render } from '@testing-library/react';
import React from 'react';
import Title from '@src/components/UI/Title/Title';

describe('Title', () => {
  it('should render Title with correct text', () => {
    const text = 'Test Title';
    const { getByText } = render(<Title>{text}</Title>);
    const title = getByText(text);
    expect(title).toBeInTheDocument();
  });
  it('should render Title with correct style', () => {
    const text = 'Test Title';
    const component = (
      <Title
        margin="5px 10px"
        fz={15}
        color="#ff000"
        height='20px'
        align='center'
      >
        {text}
      </Title>
    );
    const { getByText } = render(component);
    const title = getByText(text);
    expect(title).toHaveStyle('margin: 5px 10px; font-size: 15px; color: #ff000; height: 20px; text-align: center');
  });
});
