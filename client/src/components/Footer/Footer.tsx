import React from 'react';
import * as S from './style';

const Footer: React.FC = () => {
  return (
    <S.FooterWrapper>
      <S.FooterContent>
        <S.FooterText>&copy; 2023</S.FooterText>
        <S.FooterList>
          <S.FooterItem target='_blank' href='#'>YouTube</S.FooterItem>
          <S.FooterItem target='_blank' href='#'>Facebook</S.FooterItem>
          <S.FooterItem target='_blank' href='#'>Email</S.FooterItem>
        </S.FooterList>
      </S.FooterContent>
    </S.FooterWrapper>
  );
};

export default Footer;
