import styled from 'styled-components';

export const CreatePublicationWrapper = styled.div`
  padding: 20px 0;
`;

export const CreatePublicationMainBlock = styled.div`
  background-color: ${({ theme }) => theme.componentBg};
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(85, 85, 85, 0.1);
  margin-bottom: 20px;
`;

export const CreatePublicationControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
