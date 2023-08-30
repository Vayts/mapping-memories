import React, { ChangeEvent, memo, useCallback, useState } from 'react';
import { IEditPhotoState } from '@src/components/EditPhoto/types';
import EditPhoto from '@src/components/EditPhoto/EditPhoto';
import FileUploader from '@src/components/UI/FileUploader/FileUploader';
import Title from '@src/components/UI/Title/Title';
import Input from '@src/components/UI/Input/Input';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Button from '@src/components/UI/Button/Button';
import { IPhotoContentBlockProps } from './types';
import * as Style from '../style';
import * as S from './style';

const editPhotoInitial = {
  isOpen: false,
  photo: null,
  photoBlob: null,
  width: 500,
  height: 269,
  border: 60,
  saveFunc: () => null,
  photoName: 'photo',
};

const PhotoContentBlock: React.FC<IPhotoContentBlockProps> = ({ contentBlock, onChange, onPhotoSave }) => {
  const [editPhotoState, setEditPhoto] = useState<IEditPhotoState>(editPhotoInitial);
  const [photoBlob, setPhotoBlob] = useState<null | string>(null);
  const { content, _id, touched, errors } = contentBlock;
  const { t } = useTranslation();
  
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e, _id);
  }, []);
  
  const setPhotoHandler = (photo: any) => {
    onPhotoSave(photo, _id, 'photo');
    setPhotoBlob(URL.createObjectURL(photo));
  };
  
  const removePhoto = useCallback(() => {
    onPhotoSave(null, _id, 'photo');
    setPhotoBlob(null);
  }, []);
  
  const openEditPhoto = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const photo = e.target.files[0];
      const photoBlob = URL.createObjectURL(photo);
      setEditPhoto((prev) => {
        return {
          ...prev,
          photo,
          photoBlob,
          photoName: `${uuidv4()}_${Date.now()}`,
          isOpen: true,
          saveFunc: setPhotoHandler };
      });
      return true;
    }
    return false;
  }, []);
  
  return (
    <Style.ContentBlockHolder>
      {editPhotoState.isOpen
        ? (
          <EditPhoto
            state={editPhotoState}
            setState={setEditPhoto}
          />
        ) : null}
      <Title>{t('photo')}</Title>
      <S.PhotoContentBlockImgWrapper>
        <FileUploader
          id={`contentBlock${_id}Photo`}
          onChange={openEditPhoto}
          name='photo'
          value={photoBlob}
          margin='0'
        />
      </S.PhotoContentBlockImgWrapper>
      <Button
        margin='15px 0 0'
        text={t('deletePhoto')}
        clickHandler={removePhoto}
        disabled={content.photo === null}
      />
      <Input
        id={`source${_id}`}
        name='source'
        value={content.source}
        margin='10px 0 5px'
        onChange={changeHandler}
        label={`${t('source')}  (${t('optional')})`}
        placeholder={t('source')}
        isValid={touched?.source && !errors?.source}
        fz={16}
        padding='10px'
        min={2}
      />
      <ErrorMsg show={touched?.source && !!errors?.source} margin='5px 0 5px'>{errors?.source}</ErrorMsg>
      <Title
        fz={16}
        fw={400}
      >
        {`${t('shortDescription')} (${t('optional')})`}
      </Title>
      <Input
        locale='uk'
        id={`descriptionUK${_id}`}
        name='description'
        value={content.description.uk}
        margin='10px 0 5px'
        onChange={changeHandler}
        placeholder={t('ukrainian')}
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
    </Style.ContentBlockHolder>
  );
};

export default memo(PhotoContentBlock);
