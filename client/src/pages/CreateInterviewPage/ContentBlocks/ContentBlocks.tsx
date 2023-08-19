import React, { ChangeEvent, useCallback, useState } from 'react';
import { IContentBlocksProps } from '@src/pages/CreateInterviewPage/ContentBlocks/types';
import Modal from '@src/components/Modal/Modal';
import AddContentBlockModal from '@src/pages/CreateInterviewPage/ContentBlocks/AddContentBlockModal/AddContentBlockModal';
import Button from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { ICreateRecipeContentBlock, IVideoContentBlock } from '@src/types/createInterviewTypes';
import { INTERVIEW_BLOCK_TYPES } from '@constants/interviewContentBlocks';
import VideoContentBlock from '@src/pages/CreateInterviewPage/ContentBlocks/VideoContentBlock/VideoContentBlock';
import Title from '@src/components/UI/Title/Title';
import * as S from './style';

const ContentBlocks: React.FC<IContentBlocksProps> = ({ setContentBlocks, contentBlocks }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  
  const toggleModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);
  
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    const { name, value } = e.target;
    const language: string | undefined = e.target.dataset.language;
    
    setContentBlocks((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            content: {
              ...item.content,
              [name]: language
                ? {
                  ...item.content[name],
                  [language]: value,
                }
                : value,
            },
          };
        }
        return item;
      });
    });
  }, []);
  
  const generateContent = (contentBlock: ICreateRecipeContentBlock) => {
    switch (contentBlock.type) {
    case INTERVIEW_BLOCK_TYPES.Y_VIDEO:
      return (
        <VideoContentBlock
          contentBlock={contentBlock as IVideoContentBlock}
          onChange={changeHandler}
        />
      );
    default:
      return null;
    }
  };
  
  return (
    <S.ContentBlocksWrapper>
      <Title
        margin='0 0 20px'
        fz={30}
      >
        {t('content')}
      </Title>
      {isModalOpen && (
        <Modal outsideHandler={toggleModal}>
          <AddContentBlockModal
            setContentBlocks={setContentBlocks}
            setModal={setModalOpen}
          />
        </Modal>
      )}
      <S.ContentBlocksList>
        {contentBlocks.map((item) => (
          <S.ContentBlockItem key={item._id}>
            {generateContent(item)}
          </S.ContentBlockItem>
        ))}
      </S.ContentBlocksList>
      <Button
        padding='15px 20px'
        margin='15px auto'
        text={t('addContentBlock')}
        clickHandler={toggleModal}
      />
    </S.ContentBlocksWrapper>
  );
};

export default ContentBlocks;
