import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Content = styled.div`
  min-width: 150px;
  max-width: 500px;
`;

export const PhotoWrapper = styled.div`
  position: relative;

  &:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: inset 0 0 66px -6px rgba(0,0,0,1);
    content: "";
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 200px;
  display: block;
  margin: 0 10px 0 0;
  object-fit: cover;
  vertical-align: top;
`;

export const InfoTitle = styled.h2`
  margin: 0 0 5px 0;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 16px;
`;

export const InfoData = styled.div`
  padding: 20px 15px 10px;
  overflow-y: auto;
  max-height: 250px;
`;

export const InfoDescription = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;

export const InfoLinks = styled.div`
  margin: 10px 0 5px;
  display: flex;
  justify-content: space-between;
`;

export const InfoLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.accentColor};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.accentColorActive};
    text-decoration: underline;
  }
`;

export const InfoAddress = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.lightTxtColor};;
  line-height: 1;
`;
