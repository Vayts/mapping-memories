import styled from 'styled-components';
import { ICheckboxStyle } from '@src/components/UI/Checkbox/types';

export const CheckboxWrapper = styled.label<ICheckboxStyle>`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  user-select: none;
 
  cursor: pointer;
`;

export const CheckboxText = styled.p`
  margin: 0;
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const CheckboxCustom = styled.div<ICheckboxStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
  border: 1px solid ${({ theme, checked }) => (checked ? theme.accessColor : theme.lightBgColor)};
  border-radius: 5px;
  margin-right: 8px;
  transition: all 0.2s;
  white-space: nowrap;
  background-color: ${({ theme, checked }) => (checked ? theme.accentColor : 'transparent')};

  span {
    font-size: 14px;
    color: ${({ checked }) => (checked ? '#fff' : 'transparent')};
  }
`;
