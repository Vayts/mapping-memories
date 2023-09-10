import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const Container = styled.div`
  max-width: 1220px;
  margin: 60px auto 0;
  padding: 0 25px 40px;
  position: relative;
  min-height: calc(100vh - 60px);
  
  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    padding: 0 15px 40px;
  }
`;
