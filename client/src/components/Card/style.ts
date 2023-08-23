import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const CardWrapper = styled(NavLink)`
  //max-width: 380px;
  min-height: 410px;
  text-decoration: none;
  display: block;
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: all 0.2s;
  box-shadow: 0 0 5px rgba(136, 136, 136, 0.15);

  &:hover {
    box-shadow: 0 0 5px rgba(136, 136, 136, 0.30);
  }
`;

export const CardImg = styled.img`
  width: 100%;
  height: 240px;
  margin-bottom: 10px;
  vertical-align: bottom;
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
  
  h3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.primaryTextColor};
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
  
  span {
    font-size: 14px;
  }
`;
