import styled from 'styled-components';

export const EditPublicationMainBlock = styled.div`
  background-color: ${({ theme }) => theme.componentBg};
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(85, 85, 85, 0.1);
  margin-bottom: 20px;
`;

export const EditPublicationControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
