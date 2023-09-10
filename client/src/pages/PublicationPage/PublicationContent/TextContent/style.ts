import styled from 'styled-components';

export const TextContentWrapper = styled.div`
  margin: 15px 0;
  
  blockquote {
    position: relative;
    font-style: italic;
    
    &:before {
      position: absolute;
      content: '';
      width: 5px;
      height: 100%;
      background-color: ${({ theme }) => theme.accentColorHover};
      display: block;
      left: -25px;
    }
  }
`;
