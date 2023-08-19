import styled from 'styled-components';
import { ISelectStyle } from '@src/components/UI/Select/types';

export const SelectListWrapper = styled.ul<ISelectStyle>`
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 8;
  margin: 10px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.componentBg};
  list-style: none;
  box-shadow: ${({ theme, isOpen }) => (isOpen ? theme.modalShadow : 'none')};

  border: 1px solid ${({ theme }) => theme.greyColor};

  ::-webkit-scrollbar {
    width: 5px;
    background-color: ${({ theme }) => theme.greyLight};
  }

  /* Track */

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background: ${({ theme }) => theme.primaryColor};
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

export const SelectItem = styled.li`
  padding: 7px 10px;
  
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.primaryLight};
  }
`;

export const SelectNothingFound = styled.li`
  text-align: center;
  padding: 20px 0;
`;
