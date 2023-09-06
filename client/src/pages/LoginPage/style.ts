import styled from 'styled-components';

export const LoginPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginWindow = styled.div`
  background-color: ${({ theme }) => theme.componentBg};
  padding: 30px 40px;
	width: 450px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
`;
