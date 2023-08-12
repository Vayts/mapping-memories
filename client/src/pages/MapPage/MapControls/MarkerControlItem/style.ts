import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const MemorialControlWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 15px;
  width: 100%;
  border-bottom: 1px solid #dedede;

  &:hover {
    background-color: #ececec;
    cursor: pointer;
  }
`;

export const MemorialIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const MemorialInfo = styled.div`
  padding: 7px 0;
`;

export const MemorialTitle = styled.h5`
  margin: 0 0 3px;
  width: 210px;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 14px;

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    width: 270px;
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    min-width: 320px;
  }
`;

export const MemorialAddress = styled.p`
  width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: ${({ theme }) => theme.lightBgColor};
  margin: 0;

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    width: 270px;
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    min-width: 320px;
  }
`;
