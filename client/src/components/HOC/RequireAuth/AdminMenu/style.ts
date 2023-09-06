import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const AminMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.accentColor};
  box-shadow: ${({ theme }) => theme.modalShadow};
  width: 250px;
  padding: 15px;
  color: #ffffff;
`;

export const AdminList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const AdminListItem = styled.li`
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const AdminNavLink = styled(NavLink)`
  text-transform: uppercase;
  text-decoration: none;
  width: 100%;
  color: inherit;
  padding: 10px 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #fff;
    color: ${({ theme }) => theme.accentColor};
  }
  
  span {
    margin-right: 5px;
  }
  
  &.active {
    background-color: #fff;
    color: ${({ theme }) => theme.accentColor};
  }
`;
