import styled from 'styled-components';

export const AddMemorialWrapper = styled.div`
  padding: 20px 40px;
  width: 100%;
`;

export const AddMemorialControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const AddMemorialBlock = styled.div`
  background-color: ${({ theme }) => theme.componentBg};
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(85, 85, 85, 0.1);
  margin-bottom: 20px;
`;

export const AddMemorialIconWrapper = styled.div`
  width: 50px;
  height: 50px;
`;

export const AddMemorialPhotoWrapper = styled.div`
  width: 500px;
  height: 200px;
`;
