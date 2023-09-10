import styled from 'styled-components';

export const MemorialTypesTableWrapper = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  width: calc(100% - 20px);
  background-color: #fff;
  margin: 0 10px 40px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.softShadow};
`;

export const MemorialTypesTableHead = styled.thead`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.semiLightBgColor};
  
  th {
    text-align: left;
    padding: 15px 5px;
    font-weight: 600;
    color: ${({ theme }) => theme.primaryTextColor};
    font-size: 14px;
  }

  th:first-child {
    width: 5%;
    padding-left: 10px;
    text-align: center;
  }

  th:nth-child(2) {
    width: 60%;
  }

  th:nth-child(3) {
    width: 30%;
  }

  th:nth-child(4) {
    width: 5%;
    text-align: center;
  }
`;
