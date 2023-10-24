import styled from 'styled-components';

export const AdminHeader = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

export const AdminTitleWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const AdminRefreshButton = styled.span`
  color: ${({ theme }) => theme.lightTxtColor};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
  }
`;

export const AdminHeaderControls = styled.div`
  display: flex;
  gap: 20px;
`;
