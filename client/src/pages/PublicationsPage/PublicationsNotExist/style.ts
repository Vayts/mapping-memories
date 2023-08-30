import styled from 'styled-components';

export const NotExistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

export const NotExistIcon = styled.div`
  padding: 45px;
  background-color: ${({ theme }) => theme.brightBgColor};
  border-radius: 50%;
  
  span {
    color: ${({ theme }) => theme.lightBgColor};
    font-size: 120px;
  }
`;

export const NotExistTextWrapper = styled.div`
  max-width: 520px;
`;
