import styled from 'styled-components';

export const AdminPublicationsWrapper = styled.div``;

export const AdminHeader = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

export const AdminHeaderControls = styled.div`
  display: flex;
  gap: 20px;
`;
