import styled from 'styled-components';

export const PageNotFoundWrapper = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageNotFoundContent = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.brightBgColor};
  border-radius: 50%;
`;

export const PageNotFoundImg = styled.img`
  width: 90%;
`;

export const PageNotFoundText = styled.p`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
`;

export const PageNotFoundDownContent = styled.div`
  max-width: 300px;
  text-align: center;
`;
