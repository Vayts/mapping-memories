import styled from 'styled-components';

export const NothingFoundWrapper = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.lightTxtColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  margin-top: -40px;
`;

export const NothingText = styled.p`
  text-align: center;
  font-size: 14px;
`;

export const NothingIcon = styled.span`
  font-size: 75px;
`;

export const ZoomButton = styled.span`
  text-decoration: underline;
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.accentColor};
  }
`;
