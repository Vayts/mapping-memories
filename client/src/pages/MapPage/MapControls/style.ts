import styled from 'styled-components';
import { IMapControlsStyle } from '@src/pages/MapPage/MapControls/types';
import { RESPONSIVE } from '@constants/style';

export const ControlsWrapper = styled.div<IMapControlsStyle>`
  max-width: 280px;
  height: 100%;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  z-index: 10;
  box-shadow: 3px 10px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    min-width: 350px;
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {
    min-width: 400px;
  }
`;

export const ToggleButton = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 75px 0 75px 40px;
  border-color: transparent transparent transparent ${({ theme }) => theme.accentColor};
  position: absolute;
  left: calc(100%);
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.2s;
  z-index: -1;

  &:hover {
    border-color: transparent transparent transparent ${({ theme }) => theme.accentColorHover};
  }

  span {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    transition: all 0.2s;
  }
`;

export const CategoriesBlock = styled.div`
  height: 40%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
`;

export const ControlTypeBlock = styled.div`
  background-color: #f3f3f3;
  padding: 8px;
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ResetTypeButton = styled.span`
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  color: ${({ theme }) => theme.lightBgColor};
  animation: appear 0.1s;

  &:hover {
    color: ${({ theme }) => theme.secondaryTextColor};
    text-decoration: underline;
  }
`;

export const MarkersBlock = styled.div`
  height: 60%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const MarkersTypes = styled.div`
  display: flex;
  background-color: #f3f3f3;
  padding: 8px 0 8px 8px;
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
  position: relative;
`;

export const MarkerTypeLabel = styled.label`
  margin-right: 10px;
  font-size: 18px;
  padding: 5px 10px;
  user-select: none;
  transition: all 0.2s;
  border-radius: 5px;
  display: block;
  color: #b7b7b7;
  background-color: #dfdede;

  &:hover {
    cursor: pointer;
    background-color: #e87f7f;
    color: #ffffff;
  }
`;

export const MarkerTypeRadio = styled.input.attrs({
  type: 'radio',
})`
  display: none;

  &:checked + label {
    background-color: ${({ theme }) => theme.accentColor};
    color: #ffffff;
  }
`;

export const MarkersList = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  margin: 0;
  padding: 0;
`;
