import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { RESPONSIVE } from '@constants/style';

export const CardWrapper = styled(NavLink)`
  min-height: 410px;
  text-decoration: none;
  display: block;
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: all 0.2s;
  box-shadow: 0 0 5px rgba(136, 136, 136, 0.15);

  &:hover {
    box-shadow: 0 0 5px rgba(136, 136, 136, 0.30);
  }

  @media screen and (min-width: ${RESPONSIVE.mobileL}) {
    display: flex;
    min-height: auto;
    
    img {
      margin-bottom: 0;
      max-width: 230px;
      max-height: 150px;
    }
  }

  @media screen and (min-width: ${RESPONSIVE.tablet}) {

    img {
      min-width: 330px;
      max-width: 330px;
      max-height: unset;
    }
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    display: block;
    min-height: 410px;
    
    img {
      max-width: unset;
      max-height: unset;
    }
  }
`;

export const CardImg = styled.img`
  width: 100%;
  height: 240px;
  margin-bottom: 10px;
  vertical-align: bottom;

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    max-width: 380px;
  }
`;

export const CardDate = styled.span`
  color: ${({ theme }) => theme.accentColor};
  border-radius: 3px;
  font-size: 14px;
  display: inline-block;
  margin: 0 0 10px;
`;

export const CardInfo = styled.div`
  padding: 10px;
  width: 100%;
  
  h3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
  }
  
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #000;
  
  h3 {
    flex-grow: 1;
  }
  
  span {
    font-size: 12px;
    margin-left: 5px;
  }
`;
