import React, { ChangeEvent, useCallback, useState } from 'react';
import Modal from '@src/components/Modal/Modal';
import Button from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import {
  ICreatePublicationContentBlock,
  IPdfContentBlock,
  IPhotoContentBlock,
  ITextContentBlock,
  IVideoContentBlock,
} from '@src/types/createPublication.types';
import { PUBLICATION_BLOCK_TYPES } from '@constants/publicationContentBlocks';
import Title from '@src/components/UI/Title/Title';
import { getContentBlockValidation } from '@src/validation/createPublication.validation';
import { LocaleType } from '@src/types/locale.types';
import { IContentBlocksProps } from '@src/components/ContentBlocks/types';
import VideoContentBlock from '@src/components/ContentBlocks/VideoContentBlock/VideoContentBlock';
import TextContentBlock from '@src/components/ContentBlocks/TextContentBlock/TextContentBlock';
import PhotoContentBlock from '@src/components/ContentBlocks/PhotoContentBlock/PhotoContentBlock';
import PdfContentBlock from '@src/components/ContentBlocks/PdfContentBlock/PdfContentBlock';
import AddContentBlockModal from '@src/components/ContentBlocks/AddContentBlockModal/AddContentBlockModal';
import * as S from './style';

const ContentBlocks: React.FC<IContentBlocksProps> = ({ setContentBlocks, contentBlocks, isInEditMode }) => {
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
  
  const saveFileHandler = useCallback((value: File | null, id: string, name: string) => {
    setContentBlocks((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            content: {
              ...item.content,
              [name]: value,
            },
            touched: {
              ...item.touched,
              [name]: true,
            },
            errors: {
              ...getContentBlockValidation({
                ...item,
                content: {
                  ...item.content,
                  [name]: value,
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
  
  const generateContent = (contentBlock: ICreatePublicationContentBlock) => {
    switch (contentBlock.type) {
    case PUBLICATION_BLOCK_TYPES.Y_VIDEO:
      return (
        <VideoContentBlock
          contentBlock={contentBlock as IVideoContentBlock}
          onChange={changeHandler}
        />
      );
    case PUBLICATION_BLOCK_TYPES.TEXT:
      return (
        <TextContentBlock
          onChange={changeTextEditorHandler}
          contentBlock={contentBlock as ITextContentBlock}
          isInEditMode={isInEditMode}
        />
      );
    case PUBLICATION_BLOCK_TYPES.PHOTO:
      return (
        <PhotoContentBlock
          onPhotoSave={saveFileHandler}
          onChange={changeHandler}
          contentBlock={contentBlock as IPhotoContentBlock}
          isInEditMode={isInEditMode}
        />
      );
    case PUBLICATION_BLOCK_TYPES.PDF:
      return (
        <PdfContentBlock
          onChange={saveFileHandler}
          contentBlock={contentBlock as IPdfContentBlock}
          isInEditMode={isInEditMode}
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
