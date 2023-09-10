import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Button from './Button';

describe('Button', () => {
  it('should render button with the correct text', () => {
    const text = 'test';
    const { getByRole } = render(<Button clickHandler={() => null} text={text}/>);
    const button = getByRole('button');
    expect(button).toHaveTextContent(text);
  });
  it('should render button with cancel type', () => {
    const text = 'test';
    const { getByRole } = render(<Button clickHandler={() => null} text={text} styleType='cancel'/>);
    const button = getByRole('button');
    expect(button).toHaveTextContent(text);
  });
  it('should render button with confirm type', () => {
    const text = 'test';
    const { getByRole } = render(<Button clickHandler={() => null} text={text} styleType='confirm'/>);
    const button = getByRole('button');
    expect(button).toHaveTextContent(text);
  });
  it('should render button with primary type', () => {
    const text = 'test';
    const { getByRole } = render(<Button clickHandler={() => null} text={text} styleType='primary'/>);
    const button = getByRole('button');
    expect(button).toHaveTextContent(text);
  });
  it('should render button with transparent type', () => {
    const text = 'test';
    const { getByRole } = render(<Button clickHandler={() => null} text={text} styleType='transparent'/>);
    const button = getByRole('button');
    expect(button).toHaveTextContent(text);
  });
  it('should render button with the correct default styles', () => {
    const text = 'test';
    const { getByRole } = render(<Button clickHandler={() => null} text={text}/>);
    const button = getByRole('button');
    expect(button).toHaveStyle('padding: 7px 20px; margin: 5px 10px');
  });
  it('should render button with the correct padding and margin', () => {
    const text = 'test';
    const { getByRole } = render(<Button clickHandler={() => null} text={text} padding='10px 20px' margin='20px 40px'/>);
    const button = getByRole('button');
    expect(button).toHaveStyle('padding: 10px 20px; margin: 20px 40px');
  });
  it('event click should work correctly', () => {
    const onClick = jest.fn();
    const text = 'test';
    const { getByRole } = render(<Button clickHandler={onClick} text={text} padding='10px 20px' margin='20px 40px'/>);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
  it('event click should been called once', () => {
    const onClick = jest.fn();
    const text = 'test';
    const { getByRole } = render(<Button clickHandler={onClick} text={text} padding='10px 20px' margin='20px 40px'/>);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
