import styled from 'styled-components';

export const AdminCityMarkerHeader = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

export const AdminCityMarkerControls = styled.div`
  display: flex;
  justify-content: space-between;
`;
