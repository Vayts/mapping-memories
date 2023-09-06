import styled from 'styled-components';

export const MainPhotoWrapper = styled.div`
  width: 380px;
  height: 240px;
`;

export const PublicationMainBlock = styled.div`
  background-color: ${({ theme }) => theme.componentBg};
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(85, 85, 85, 0.1);
  margin-bottom: 20px;
`;
