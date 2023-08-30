import styled from 'styled-components';
import { ISearchStyle } from '@src/components/UI/Search/types';

export const SearchWrapper = styled.div<ISearchStyle>`
  height: ${({ height = '35px' }) => height};
  margin: ${({ margin = '5px 0' }) => margin};
  display: flex;
  align-items: center;
  box-sizing:border-box;
`;

export const SearchElem = styled.label<ISearchStyle>`
  height: ${({ height = '35px' }) => height};
  width: ${({ width = 'auto' }) => `calc(${width} - 30px)`};
  font-size: ${({ fz = 16 }) => `${fz}px`};
	display: flex;
  flex-basis: 100%;
  align-items: center;
  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.semiLightBgColor};
  background-color: ${({ theme }) => theme.componentBg};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.blackColor};
  }
`;

export const SearchButton = styled.div<ISearchStyle>`
  height: ${({ height = '35px' }) => height};
  width: 40px;
  background-color: ${({ theme }) => theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    background-color: ${({ theme }) => theme.accentColorActive};
  }
`;

export const SearchIcon = styled.span`
	font-size: 20px;
	color: ${({ theme }) => theme.componentBg};
`;
