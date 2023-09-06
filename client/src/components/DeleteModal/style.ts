import styled from 'styled-components';

export const DeleteModalWrapper = styled.div`
  background-color: #fff;
  min-height: 200px;
  max-width: 500px;
  min-width: 440px;
  padding: 15px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

export const DeleteModalCloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${({ theme }) => theme.lightBgColor};
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
  }
`;

export const DeleteModalButtons = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
