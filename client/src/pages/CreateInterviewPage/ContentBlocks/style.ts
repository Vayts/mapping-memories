import styled from 'styled-components';

export const ContentBlocksWrapper = styled.div``;

export const ContentBlockHolder = styled.div`
  background-color: ${({ theme }) => theme.componentBg};
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(85, 85, 85, 0.1);
  margin-bottom: 20px;
`;

export const ContentBlockIframe = styled.iframe`
  width: 500px;
  height: 320px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  position: relative;
  
  &:before {
    content: 'JOPA';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    z-index: 10;
  }
`;

export const ContentBlocksList = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
`;

export const ContentBlockItem = styled.li``;
