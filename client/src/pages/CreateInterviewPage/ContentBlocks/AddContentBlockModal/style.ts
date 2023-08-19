import styled, { css } from 'styled-components';
import { IAddContentBlockStyle } from '@src/pages/CreateInterviewPage/ContentBlocks/AddContentBlockModal/types';

export const AddContentBlockWrapper = styled.div`
  background-color: ${({ theme }) => theme.componentBg};
  max-width: 400px;
  width: 400px;
  position: relative;
  padding-bottom: 10px;
  border-radius: 5px;
  
  & > span {
    font-size: 12px;
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${({ theme }) => theme.lightBgColor};
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover {
      color: ${({ theme }) => theme.primaryTextColor};
    }
  }
`;

export const ContentBlockList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
`;

export const ContentBlockLabel = styled.label<IAddContentBlockStyle>`
  display: block;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  color: ${({ theme, checked }) => (checked ? theme.componentBg : 'inherit')};;
  background-color: ${({ theme, checked }) => (checked ? theme.accentColor : 'transparent')};
  border-bottom: 1px solid ${({ theme, checked }) => (checked ? theme.accentColor : theme.semiLightBgColor)};
  transition: all 0.1s;
  
  ${({ checked, theme }) => {
    if (!checked) {
      return css`
        &:hover {
          background-color: ${theme.brightBgColor};
        }
      `;
    }
  }}
`;

export const ContentBlockRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`;
