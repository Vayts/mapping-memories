import React, { memo, useCallback, useState } from 'react';
import TextEditor from '@src/components/UI/TextEditor/TextEditor';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import { EditorState } from 'draft-js';
import { LocaleType } from '@src/types/types';
import { convertToHTML } from 'draft-convert';
import { ITextEditor } from '@src/pages/CreateInterviewPage/ContentBlocks/TextContentBlock/types';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import * as S from '../style';

const TextContentBlock: React.FC<ITextEditor> = ({ onChange, contentBlock }) => {
  const { _id, touched, errors } = contentBlock;
  const [textContent, setTextContent] = useState({
    uk: EditorState.createEmpty(),
    en: EditorState.createEmpty(),
  });
  const { t } = useTranslation();
  
  const changeHandler = useCallback((editor: EditorState, locale: LocaleType) => {
    setTextContent((prev) => {
      return {
        ...prev,
        [locale]: editor,
      };
    });
    
    const html = convertToHTML(editor.getCurrentContent());
    
    onChange('text', html, locale, _id);
  }, []);
  
  return (
    <S.ContentBlockHolder>
      <Title>{t('text')}</Title>
      <Title
        margin='0 0 10px'
        fz={16}
      >
        {t('ukrainian')}
      </Title>
      <TextEditor editorState={textContent.uk} onChange={changeHandler} locale='uk'/>
      <ErrorMsg show={touched?.text?.uk && !!errors?.text?.uk} margin='5px 0 5px'>{errors?.text?.uk}</ErrorMsg>
      <Title
        margin='20px 0 10px'
        fz={16}
      >
        {t('english')}
      </Title>
      <TextEditor editorState={textContent.en} onChange={changeHandler} locale='en'/>
      <ErrorMsg show={touched?.text?.en && !!errors?.text?.en} margin='5px 0 5px'>{errors?.text?.en}</ErrorMsg>
    </S.ContentBlockHolder>
  );
};

export default memo(TextContentBlock);
