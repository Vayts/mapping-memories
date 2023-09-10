import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Input from './Input';

describe('Input', () => {
  it('should render input with the correct value', () => {
    const text = 'test';
    const { getByRole } = render(<Input
      onChange={() => null}
      value={text}
      id='testId'
      name='testName'
    />);
    const input = getByRole('textbox');
    expect(input).toHaveValue(text);
  });
  it('onChange func should been called correct', () => {
    const data = {
      value: '1',
    };
    const onChange = jest.fn();
    const { getByRole } = render(<Input
      onChange={(e) => onChange(e)}
      value={data.value}
      id='testId'
      name='testName'
    />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '2' } });
    expect(onChange).toHaveBeenCalled();
  });
  it('input should render with correct style', () => {
    const data = {
      value: '1',
    };
    const onChange = jest.fn();
    const { getByRole } = render(<Input
      onChange={(e) => onChange(e)}
      value={data.value}
      id='testId'
      name='testName'
      padding='20px 40px'
    />);
    const input = getByRole('textbox');
    expect(input).toHaveStyle('padding: 20px 40px');
  });
  it('input wrapper should render with correct style', () => {
    const data = {
      value: '1',
    };
    const onChange = jest.fn();
    const { getByRole } = render(<Input
      onChange={(e) => onChange(e)}
      value={data.value}
      id='testId'
      name='testName'
      margin='10px 30px'
      padding='20px 40px'
    />);
    const input = getByRole('textbox') as HTMLInputElement;
    const parentNode = input.parentNode as Node;
    expect(parentNode.parentNode).toHaveStyle('margin: 10px 30px');
  });
  it('should toggle the password visibility when the secure icon is clicked', () => {
    const data = {
      value: '1',
    };
    const onChange = jest.fn();
    const { getByTestId, getByLabelText } = render(<Input
      onChange={(e) => onChange(e)}
      value={data.value}
      id='testId'
      name='testName'
      type='password'
      label='password'
      margin='10px 30px'
      padding='20px 40px'
      isSecure
    />);
    const icon = getByTestId('secureIcon');
    fireEvent.mouseUp(icon);
    expect(getByLabelText('password')).toHaveAttribute('type', 'text');
    fireEvent.mouseDown(icon);
    expect(getByLabelText('password')).toHaveAttribute('type', 'password');
  });
  it('should toggle the password visibility when the secure icon is touched', () => {
    const data = {
      value: '1',
    };
    const onChange = jest.fn();
    const { getByTestId, getByLabelText } = render(<Input
      onChange={(e) => onChange(e)}
      value={data.value}
      id='testId'
      name='testName'
      type='password'
      label='password'
      margin='10px 30px'
      padding='20px 40px'
      isSecure
    />);
    const icon = getByTestId('secureIcon');
    fireEvent.touchStart(icon);
    expect(getByLabelText('password')).toHaveAttribute('type', 'text');
    fireEvent.touchEnd(icon);
    expect(getByLabelText('password')).toHaveAttribute('type', 'password');
  });
});
