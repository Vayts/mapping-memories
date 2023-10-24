import styled from 'styled-components';

export const AboutUsBanner = styled.div`
  img {
    border-top: 1px solid ${({ theme }) => theme.semiLightBgColor};
    border-bottom: 1px solid ${({ theme }) => theme.semiLightBgColor};
    margin: 20px 0;
    padding: 20px;
    width: 100%;
  }
`;

export const AboutUsTeamWrapper = styled.div`
  gap: 20px;
  align-items: center;
  display: grid;
  grid-template-areas: 'row row row';
`;

export const AboutUsTeamMember = styled.article`
  //grid-area: row;
  
  img {
    max-height: 450px;
    max-width: 100%;
    border-radius: 10px;
  }
`;
