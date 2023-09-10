import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import SelectList from '@src/components/UI/Select/SelectList/SelectList';

describe('SelectList', () => {
  it('should render SelectList', () => {
    const { getByTestId } = render(<SelectList isOpen inputValue='as' valueArr={['test1', 'test2']} onClick={(e) => jest.fn()} searchable/>);
    const selectList = getByTestId('selectList');
    expect(selectList).toBeInTheDocument();
  });
  it('should render with correct amount of child nodes', () => {
    const { getByTestId } = render(<SelectList isOpen inputValue='as' valueArr={['test1', 'test2']} onClick={(e) => jest.fn()}/>);
    const selectList = getByTestId('selectList');
    expect(selectList.children).toHaveLength(2);
  });
  it('should render with correct amount of child nodes 1', () => {
    const { getByTestId } = render(<SelectList
      isOpen
      inputValue='test1'
      valueArr={['test1', 'test2']}
      onClick={(e) => jest.fn()}
      searchable
    />);
    const selectList = getByTestId('selectList');
    expect(selectList.children).toHaveLength(1);
  });
  it('should render with nothing found', () => {
    const { getByTestId } = render(<SelectList
      isOpen
      inputValue='test12'
      valueArr={['test1', 'test2']}
      onClick={(e) => jest.fn()}
      searchable
    />);
    const selectListNothingFound = getByTestId('selectListNothingFound');
    expect(selectListNothingFound).toBeInTheDocument();
  });
  it('should render with correct amount of child nodes 2', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<SelectList
      isOpen
      inputValue='test1'
      valueArr={['test1', 'test2']}
      onClick={onClick}
      searchable
    />);
    const selectListItem = getByTestId('selectListItem');
    fireEvent.click(selectListItem);
    expect(onClick).toHaveBeenCalled();
  });
});
