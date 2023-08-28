import React, { ChangeEvent, useCallback, useState } from 'react';
import { IContentBlocksProps } from '@src/pages/CreateInterviewPage/ContentBlocks/types';
import Modal from '@src/components/Modal/Modal';
import AddContentBlockModal from '@src/pages/CreateInterviewPage/ContentBlocks/AddContentBlockModal/AddContentBlockModal';
import Button from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { ICreateInterviewContentBlock, IPhotoContentBlock, ITextContentBlock, IVideoContentBlock } from '@src/types/createInterviewTypes';
import { INTERVIEW_BLOCK_TYPES } from '@constants/interviewContentBlocks';
import VideoContentBlock from '@src/pages/CreateInterviewPage/ContentBlocks/VideoContentBlock/VideoContentBlock';
import Title from '@src/components/UI/Title/Title';
import { getContentBlockValidation } from '@src/validation/createInterview.validation';
import TextContentBlock from '@src/pages/CreateInterviewPage/ContentBlocks/TextContentBlock/TextContentBlock';
import { LocaleType } from '@src/types/types';
import PhotoContentBlock from '@src/pages/CreateInterviewPage/ContentBlocks/PhotoContentBlock/PhotoContentBlock';
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
          const newItem = {
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
            touched: {
              ...item.touched,
              [name]: language
                ? {
                  ...item.touched[name],
                  [language]: true,
                }
                : true,
            },
          };
          
          return {
            ...newItem,
            errors: getContentBlockValidation(newItem),
          };
        }
        return item;
      });
    });
  }, []);
  
  const savePhotoHandler = useCallback((value: File | null, id: string) => {
    setContentBlocks((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            content: {
              ...item.content,
              photo: value,
            },
            touched: {
              ...item.touched,
              photo: true,
            },
            errors: {
              ...getContentBlockValidation({
                ...item,
                content: {
                  ...item.content,
                  photo: value,
                },
              }),
            },
          };
        }
        return item;
      });
    });
  }, []);
  
  const changeTextEditorHandler = useCallback((name: string, value: string, locale: LocaleType, id: string) => {
    setContentBlocks((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          const newItem = {
            ...item,
            content: {
              ...item.content,
              [name]: {
                ...item.content[name],
                [locale]: value,
              },
            },
            touched: {
              ...item.touched,
              [name]: locale
                ? {
                  ...item.touched[name],
                  [locale]: true,
                }
                : true,
            },
          };
          
          return {
            ...newItem,
            errors: getContentBlockValidation(newItem),
          };
        }
        return item;
      });
    });
  }, []);
  
  const deleteContentBlock = useCallback((id: string) => {
    setContentBlocks((prev) => prev.filter((item) => item._id !== id));
  }, []);
  
  const generateContent = (contentBlock: ICreateInterviewContentBlock) => {
    switch (contentBlock.type) {
    case INTERVIEW_BLOCK_TYPES.Y_VIDEO:
      return (
        <VideoContentBlock
          contentBlock={contentBlock as IVideoContentBlock}
          onChange={changeHandler}
        />
      );
    case INTERVIEW_BLOCK_TYPES.TEXT:
      return (
        <TextContentBlock
          onChange={changeTextEditorHandler}
          contentBlock={contentBlock as ITextContentBlock}
        />
      );
    case INTERVIEW_BLOCK_TYPES.PHOTO:
      return (
        <PhotoContentBlock
          onPhotoSave={savePhotoHandler}
          onChange={changeHandler}
          contentBlock={contentBlock as IPhotoContentBlock}
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
            <S.ContentBlockDeleteBtn className='icon-cross' onClick={() => deleteContentBlock(item._id)}/>
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
