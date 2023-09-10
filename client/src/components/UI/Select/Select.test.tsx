import { render } from '@testing-library/react';
import React from 'react';
import Select from '@src/components/UI/Select/Select';

describe('Select', () => {
  it('should render Select', () => {
    const onChange = jest.fn();
    
    const { getByTestId } = render(<Select
      selected=""
      searchable
      onChange={onChange}
      valueArr={['b', 'a', 's']}
      id='titleSelect'
      name='titleSelect'
    />);
    const select = getByTestId('select');
    expect(select).toBeInTheDocument();
  });
  it('should render Select with label', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Select
      selected=""
      searchable
      onChange={onChange}
      valueArr={['b', 'a', 's']}
      id='titleSelect'
      name='titleSelect'
      label='Test Label'
    />);
    const selectLabel = getByTestId('selectLabel');
    expect(selectLabel).toBeInTheDocument();
  });
});
