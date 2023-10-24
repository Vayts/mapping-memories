import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { RESPONSIVE } from '@constants/style';

export const CardWrapper = styled(NavLink)`
  height: 100%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  //border: 1px solid ${({ theme }) => theme.borderColor};
  transition: all 0.2s;
  //box-shadow: 0 0 5px rgba(136, 136, 136, 0.15);
  border: 1px solid #dee2ed;

  &:hover {
    box-shadow: 0 0 5px rgba(136, 136, 136, 0.30);
  }

  @media screen and (min-width: ${RESPONSIVE.mobileL}) {
    display: flex;
    min-height: auto;
    flex-direction: row;
    
    img {
      margin-bottom: 0;
      max-width: 230px;
      max-height: 180px;
    }
  }

  @media screen and (min-width: ${RESPONSIVE.tablet}) {

    img {
      min-width: 280px;
      max-width: 280px;
      max-height: 190px;
    }
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    flex-direction: column;
    min-height: 410px;
    width: 378px;
    
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
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  
  h3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
    word-wrap: break-word;
  }
  
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
`;

export const CardTextInfo = styled.div`
  flex-grow: 1;
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
