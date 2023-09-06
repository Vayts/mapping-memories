import React, { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Title from '@src/components/UI/Title/Title';
import Input from '@src/components/UI/Input/Input';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import Description from '@src/components/UI/Description/Description';
import * as S from '../style';
import { IVideoContentBlockProps } from './types';

const VideoContentBlock: React.FC<IVideoContentBlockProps> = ({ contentBlock, onChange }) => {
  const { content, errors, touched, _id } = contentBlock;
  const { t } = useTranslation();
  
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e, _id);
  }, []);
  
  return (
    <S.ContentBlockHolder>
      <Title>{t('yVideo')}</Title>
      <Description>{t('videoBlockTxt')}</Description>
      <S.ContentBlockIframe
        src={errors.link ? '' : content.link}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <Input
        id={`link${_id}`}
        name='link'
        value={content.link}
        margin='10px 0 5px'
        onChange={changeHandler}
        placeholder={`${t('link')}`}
        label={`${t('link')}`}
        isValid={touched.link && !errors.link}
        fz={16}
        padding='10px'
        min={2}
      />
      <ErrorMsg show={touched.link && !!errors.link} margin='5px 0 5px'>{errors.link}</ErrorMsg>
      <Title
        fz={16}
        fw={400}
      >
        {`${t('shortDescription')} (${t('optional')})`}
      </Title>
      <Input
        locale='uk'
        id={`description${_id}`}
        name='description'
        value={content.description.uk}
        margin='10px 0 5px'
        onChange={changeHandler}
        placeholder={`${t('ukrainian')}`}
        fz={16}
        padding='10px'
        min={2}
      />
      <ErrorMsg show={touched?.description?.uk && !!errors?.description?.uk} margin='5px 0 5px'>{errors?.description?.uk}</ErrorMsg>
      <Input
        locale='en'
        id={`description${_id}`}
        name='description'
        value={content.description.en}
        margin='10px 0 5px'
        onChange={changeHandler}
        placeholder={`${t('english')}`}
        fz={16}
        padding='10px'
        min={2}
      />
      <ErrorMsg show={touched?.description?.en && !!errors?.description?.en} margin='5px 0 5px'>{errors?.description?.en}</ErrorMsg>
    </S.ContentBlockHolder>
  );
};

export default memo(VideoContentBlock);
