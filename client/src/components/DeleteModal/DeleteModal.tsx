import React from 'react';
import { IDeleteModalProps } from '@src/components/DeleteModal/types';
import Button from '@src/components/UI/Button/Button';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@src/hooks/hooks';
import Description from '@src/components/UI/Description/Description';
import * as S from './style';

const DeleteModal: React.FC<IDeleteModalProps> = ({ itemId, text, action, onClose }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const onDeleteHandler = () => {
    dispatch(action(itemId));
    onClose();
  };
  
  return (
    <S.DeleteModalWrapper>
      <S.DeleteModalCloseButton className='icon-cross' onClick={onClose}/>
      <Title align='center'>{t('confirmDelete')}</Title>
      <Description align='center'>{t(text)}</Description>
      <S.DeleteModalButtons>
        <Button
          width='45%'
          text={t('confirm')}
          clickHandler={onDeleteHandler}
        />
        <Button
          width='45%'
          styleType='reverse'
          text={t('cancel')}
          clickHandler={onClose}
        />
      </S.DeleteModalButtons>
    </S.DeleteModalWrapper>
  );
};

export default DeleteModal;
