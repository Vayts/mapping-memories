import React, { useCallback, useState } from 'react';
import { IAddContentBlockProps } from '@src/pages/CreateInterviewPage/ContentBlocks/AddContentBlockModal/types';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import { IInterviewContentBlock, INTERVIEW_CONTENT_BLOCKS } from '@constants/interviewContentBlocks';
import Button from '@src/components/UI/Button/Button';
import { v4 as uuidv4 } from 'uuid';
import { ICreateInterviewContentBlock } from '@src/types/createInterviewTypes';
import * as S from './style';

const AddContentBlockModal: React.FC<IAddContentBlockProps> = ({ setContentBlocks, setModal }) => {
  const [checked, setChecked] = useState<IInterviewContentBlock | null>(null);
  const { t } = useTranslation();
  
  const closeModal = () => {
    setModal(false);
  };
  
  const setCheckedHandler = (item: IInterviewContentBlock) => {
    setChecked(item);
  };
  
  const addContentBlock = useCallback(() => {
    if (checked) {
      setContentBlocks((prev) => {
        const newBlock: ICreateInterviewContentBlock = {
          _id: uuidv4(),
          errors: {},
          touched: {},
          ...checked,
        };
        
        return [...prev, newBlock];
      });
      setModal(false);
    }
  }, [checked]);
  
  return (
    <S.AddContentBlockWrapper>
      <span
        onClick={closeModal}
        className='icon-cross'
      />
      <Title
        align='center'
        margin='5px 0'
        padding='20px 10px'
      >
        {t('selectContentType')}
      </Title>
      <S.ContentBlockList>
        {INTERVIEW_CONTENT_BLOCKS.map((item) => {
          return (
            <li key={item.type} onClick={() => setCheckedHandler(item)}>
              <S.ContentBlockLabel checked={checked ? checked.type === item.type : false}>
                {t(item.type)}
                <S.ContentBlockRadio/>
              </S.ContentBlockLabel>
            </li>
          );
        })}
      </S.ContentBlockList>
      <Button
        margin='30px auto 0'
        text={t('add')}
        clickHandler={addContentBlock}
        disabled={!checked}
      />
    </S.AddContentBlockWrapper>
  );
};

export default AddContentBlockModal;
