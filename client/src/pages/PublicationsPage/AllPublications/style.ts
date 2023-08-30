import styled from 'styled-components';
import { RESPONSIVE } from '@constants/style';

export const PublicationsControls = styled.div`
  margin-bottom: 30px;

  h3 {
    margin-bottom: 20px;
  }

  & > div {
    width: 100%;
  }

  @media screen and (min-width: ${RESPONSIVE.tablet}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    h3 {
      margin-bottom: 0;
    }

    & > div {
      width: 250px;
    }
  }

  @media screen and (min-width: ${RESPONSIVE.desktop}) {

    & > div {
      width: 350px;
    }
  }
`;
