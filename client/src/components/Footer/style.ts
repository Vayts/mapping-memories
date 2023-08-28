import styled from 'styled-components';

export const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const FooterContent = styled.div`
  max-width: 1220px;
  margin: 0 auto 0;
  padding: 20px 10px;
  display: flex;
  color: ${({ theme }) => theme.lightTxtColor};
  font-size: 16px;
  font-weight: 500;
`;

export const FooterText = styled.p`
  margin: 0 10px 0 0;
`;

export const FooterList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const FooterItem = styled.a`
  margin-right: 10px;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
  }
`;
