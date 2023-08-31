import styled from 'styled-components';

export const PhotoContentWrapper = styled.div`
  margin: 15px 0;
`;

export const PhotoContentImg = styled.img`
  width: 100%;
`;

export const PhotoSourceText = styled.a`
  color: ${({ theme }) => theme.accentColor};
  display: block;
  margin-right: 3px;
  font-size: 12px;
  text-align: right;
`;

export const PhotoTextWrapper = styled.div`
  text-align: center;
`;
