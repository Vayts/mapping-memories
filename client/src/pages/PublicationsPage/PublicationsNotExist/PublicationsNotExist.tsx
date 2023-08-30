import React from 'react';
import Description from '@src/components/UI/Description/Description';
import Button from '@src/components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const PublicationsNotExist: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const backToMain = () => {
    navigate('/');
  };
  
  return (
    <S.NotExistWrapper>
      
      <S.NotExistIcon>
        <span className='icon-nothing-exist' />
      </S.NotExistIcon>
      
      <S.NotExistTextWrapper>
        <Description
          align='center'
          fz={16}
          margin='20px 0 0'
        >
          {t('notExistText')}
        </Description>
      </S.NotExistTextWrapper>
      
      <Button
        margin='20px 0 0'
        text={t('backToMain')}
        clickHandler={backToMain}
        height='50px'
      />
    
    </S.NotExistWrapper>
  );
};

export default PublicationsNotExist;
