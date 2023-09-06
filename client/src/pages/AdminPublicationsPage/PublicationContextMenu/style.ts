import styled from 'styled-components';

export const PublicationContextMenuWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const PublicationContextItem = styled.li`
  text-align: left;
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  cursor: pointer;
  transition: all 0.1s;
  
  &:hover {
    background-color: ${({ theme }) => theme.brightBgColor};
  }
  
  &:last-child {
    color: ${({ theme }) => theme.dangerColor};
    
    &:hover {
      background-color: ${({ theme }) => `${theme.dangerColor}20`};
    }
  }
`;