import React, { ChangeEvent, useCallback, useState } from 'react';
import { IEditPhotoState } from '@src/components/EditPhoto/types';
import { IMainInfoBlockProps } from '@src/pages/CreateInterviewPage/MainInfo/types';
import { LocaleFieldsMain } from '@src/types/createInterviewTypes';
import Input from '@src/components/UI/Input/Input';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import TextArea from '@src/components/UI/TextArea/TextArea';
import EditPhoto from '@src/components/EditPhoto/EditPhoto';
import FileUploader from '@src/components/UI/FileUploader/FileUploader';
import { MainPhotoWrapper } from '@src/pages/CreateInterviewPage/MainInfo/style';
import Button from '@src/components/UI/Button/Button';
import * as S from '../style';

const editPhotoInitial = {
  isOpen: false,
  photo: null,
  photoBlob: null,
  width: 380,
  height: 240,
  border: 60,
  saveFunc: () => null,
  photoName: 'firstPhoto',
};

const MainInfo: React.FC<IMainInfoBlockProps> = ({ setMainInfo, mainInfo }) => {
  const { errors, title, description, touched } = mainInfo;
  const [editPhotoState, setEditPhoto] = useState<IEditPhotoState>(editPhotoInitial);
  const [photoBlob, setPhotoBlob] = useState<null | string>(null);
  const { t } = useTranslation();
  
  const setMainPhotoHandler = useCallback((photo: any) => {
    setMainInfo((state) => {
      return {
        ...state,
        mainPhoto: photo,
      };
    });
    setPhotoBlob(URL.createObjectURL(photo));
  }, []);
  
  const openEditPhoto = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const files = e.target.files;
      const photo = files[0] as File;
      const photoBlob = URL.createObjectURL(photo);
      setEditPhoto((state) => {
        return {
          ...state,
          photo,
          photoBlob,
          isOpen: true,
          saveFunc: setMainPhotoHandler };
      });
      return true;
    }
    return false;
  }, []);
  
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const language: string | undefined = e.target.dataset.language;

    setMainInfo((prev) => {
      return {
        ...prev,
        [name]: language
          ? {
            ...prev[name as LocaleFieldsMain],
            [language]: value,
          }
          : value,
      };
    });
  }, []);
  
  const removePhoto = useCallback(() => {
    setMainInfo((state) => {
      return {
        ...state,
        mainPhoto: null,
      };
    });
    setPhotoBlob(null);
  }, []);
  
  return (
    <div>
      {editPhotoState.isOpen
        ? (
          <EditPhoto
            state={editPhotoState}
            setState={setEditPhoto}
          />
        ) : null}
      <S.CreateInterviewMainBlock>
        <Title
          margin='5px 0 15px'
        >
          {t('mainPhoto')}
        </Title>
        <MainPhotoWrapper>
          <FileUploader
            id='mainPhoto'
            onChange={openEditPhoto}
            name='mainPhoto'
            value={photoBlob}
            margin='0 0 20px'
          />
        </MainPhotoWrapper>
        <Button
          margin='15px 0 0'
          text={t('deletePhoto')}
          clickHandler={removePhoto}
          disabled={mainInfo.mainPhoto === null}
        />
      </S.CreateInterviewMainBlock>
      <S.CreateInterviewMainBlock>
        <Title
          margin='5px 0 15px'
        >
          {t('interviewTittle')}
        </Title>
        <Input
          locale='uk'
          id='titleUk'
          name='title'
          value={title.uk}
          margin='0 0 5px'
          onChange={changeHandler}
          placeholder={`${t('ukrainian')}`}
          label={`${t('ukrainian')}`}
          fz={16}
          padding='10px'
          min={2}
        />
        <ErrorMsg show={touched?.title?.uk && !!errors?.title?.uk} margin='5px 0 5px'>{errors?.title?.uk}</ErrorMsg>
        <Input
          locale='en'
          id='titleEn'
          name='title'
          margin='0 0 5px'
          value={title.en}
          onChange={changeHandler}
          placeholder={`${t('english')}`}
          label={`${t('english')}`}
          fz={16}
          padding='10px'
          min={2}
        />
        <ErrorMsg show={touched?.title?.en && !!errors?.title?.en} margin='5px 0 5px'>{errors?.title?.en}</ErrorMsg>
      </S.CreateInterviewMainBlock>
      <S.CreateInterviewMainBlock>
        <Title
          margin='5px 0 15px'
        >
          {t('interviewDescription')}
        </Title>
        <TextArea
          value={description.uk}
          onChange={changeHandler}
          name='description'
          id='descriptionUk'
          height='300px'
          margin='0'
          padding='10px'
          fz={16}
          placeholder={`${t('ukrainian')}`}
          label={`${t('ukrainian')}`}
          isValid={touched.description && !errors.description}
          max={1500}
        />
        <ErrorMsg show={touched?.description?.uk && !!errors?.description?.uk} margin='5px 0 5px'>{errors?.description?.uk}</ErrorMsg>
        <TextArea
          value={description.en}
          onChange={changeHandler}
          name='descriptionEn'
          id='asddf'
          height='300px'
          margin='0'
          padding='10px'
          fz={16}
          placeholder={`${t('english')}`}
          label={`${t('english')}`}
          isValid={touched.description && !errors.description}
          max={1500}
        />
        <ErrorMsg show={touched?.description?.en && !!errors?.description?.en} margin='5px 0 5px'>{errors?.description?.en}</ErrorMsg>
      </S.CreateInterviewMainBlock>
    </div>
  );
};

export default MainInfo;
