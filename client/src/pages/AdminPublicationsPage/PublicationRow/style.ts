import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const PublicationRowWrapper = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
  animation: ${appear} 0.2s linear;
  
  td {
    height: 60px;
    padding: 15px 5px;
    
    p {
      margin: 0 10px 0 0;
    }
  }
  
  td:first-child {
    width: 20px;
    padding-left: 10px;
    text-align: center;
  }

  td:nth-child(2) {
    width: 25%;

    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }

  td:nth-child(3) {
    min-width: 40%;
    
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }

  td:nth-child(4) {
    width: 10%;
  }

  td:nth-child(5) {
    width: 15%;
  }

  td:nth-child(6) {
    width: 5%;
    text-align: center;
  }
`;
