import styled from 'styled-components';

export const CityControlWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 15px;
  width: 100%;
  border-bottom: 1px solid #dedede;

  &:hover {
    background-color: #ececec;
    cursor: pointer;
  }
`;

export const MarkerCounter = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.accentColor};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 1;
`;

export const MarkerInfo = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

export const MarkerTitle = styled.h5`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  flex-grow: 1;
`;

export const CityMarkerIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
