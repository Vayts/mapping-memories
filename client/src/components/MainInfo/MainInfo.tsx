import React, { ChangeEvent, useCallback, useState } from 'react';
import { IEditPhotoState } from '@src/components/EditPhoto/types';
import { ICreatePublicationMain, LocaleFieldsMain } from '@src/types/createPublication.types';
import Input from '@src/components/UI/Input/Input';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import TextArea from '@src/components/UI/TextArea/TextArea';
import EditPhoto from '@src/components/EditPhoto/EditPhoto';
import FileUploader from '@src/components/UI/FileUploader/FileUploader';
import Button from '@src/components/UI/Button/Button';
import { PUBLICATION_TYPES, PUBLICATION_VALIDATION } from '@constants/createPublication';
import { getPublicationMainValidation } from '@src/validation/createPublication.validation';
import { v4 as uuidv4 } from 'uuid';
import Select from '@src/components/UI/Select/Select';
import { PublicationType } from '@src/types/publication.types';
import { BASE_URL } from '@src/api/axios';
import * as S from './style';
import { IMainInfoBlockProps } from './types';

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

const MainInfo: React.FC<IMainInfoBlockProps> = ({ setMainInfo, mainInfo, isInEditMode }) => {
  const { errors, title, description, touched } = mainInfo;
  const [isPhotoChanged, setPhotoChanged] = useState(false);
  const [editPhotoState, setEditPhoto] = useState<IEditPhotoState>(editPhotoInitial);
  const [photoBlob, setPhotoBlob] = useState<null | string>(null);
  const { t } = useTranslation();
  
  const setMainPhotoHandler = useCallback((photo: any) => {
    setMainInfo((state: ICreatePublicationMain) => {
      return {
        ...state,
        photo,
        touched: {
          ...state.touched,
          photo: true,
        },
      };
    });
    setPhotoBlob(URL.createObjectURL(photo));
    if (isInEditMode) {
      setPhotoChanged(true);
    }
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
          photoName: `${uuidv4()}_${Date.now()}`,
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

    setMainInfo((prev: ICreatePublicationMain) => {
      const newState = {
        ...prev,
        touched: {
          ...prev.touched,
          [name]: language
            ? {
              ...prev.touched[name as LocaleFieldsMain],
              [language]: true,
            }
            : true,
        },
        [name]: language
          ? {
            ...prev[name as LocaleFieldsMain],
            [language]: value,
          }
          : value,
      };
      
      return {
        ...newState,
        errors: getPublicationMainValidation(newState),
      };
    });
  }, []);
  
  const typeChangeHandler = useCallback((value: string) => {
    setMainInfo((prev: ICreatePublicationMain) => {
      const newState: ICreatePublicationMain = {
        ...prev,
        touched: {
          ...prev.touched,
          type: true,
        },
        type: value as PublicationType,
      };
      
      return {
        ...newState,
        errors: getPublicationMainValidation(newState),
      };
    });
  }, []);
  
  const removePhoto = useCallback(() => {
    setMainInfo((state: ICreatePublicationMain) => {
      return {
        ...state,
        photo: null,
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
      
      <S.PublicationMainBlock>
        <Title
          margin='5px 0 15px'
        >
          {t('photo')}
        </Title>
        <S.MainPhotoWrapper>
          <FileUploader
            id='photo'
            onChange={openEditPhoto}
            name='photo'
            value={isInEditMode && !isPhotoChanged ? `${BASE_URL}/file/download/photo?id=${mainInfo.photo}` : photoBlob}
            margin='0 0 20px'
          />
        </S.MainPhotoWrapper>
        <ErrorMsg show={touched?.photo && !!errors?.photo} margin='5px 0 5px'>{errors?.photo}</ErrorMsg>
        <Button
          margin='15px 0 0'
          text={t('deletePhoto')}
          clickHandler={removePhoto}
          disabled={mainInfo.photo === null}
        />
      </S.PublicationMainBlock>
      
      <S.PublicationMainBlock>
        <Title
          margin='5px 0 15px'
        >
          {t('publicationType')}
        </Title>
        <Select
          selected={mainInfo.type}
          name='typeSelect'
          id='typeSelect'
          isValid={touched?.type && !errors?.type}
          onChange={typeChangeHandler}
          placeholder={t('publicationType')}
          valueArr={PUBLICATION_TYPES}
        />
        <ErrorMsg show={touched?.type && !!errors?.type} margin='5px 0 5px'>{errors?.type}</ErrorMsg>
      </S.PublicationMainBlock>
      
      <S.PublicationMainBlock>
        <Title
          margin='5px 0 15px'
        >
          {t('publicationTittle')}
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
          isValid={touched?.title?.uk && !errors?.title?.uk}
          fz={16}
          padding='10px'
          min={PUBLICATION_VALIDATION.LIMIT.TITLE_MIN}
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
          isValid={touched?.title?.en && !errors?.title?.en}
          fz={16}
          padding='10px'
          min={PUBLICATION_VALIDATION.LIMIT.TITLE_MIN}
        />
        <ErrorMsg show={touched?.title?.en && !!errors?.title?.en} margin='5px 0 5px'>{errors?.title?.en}</ErrorMsg>
      </S.PublicationMainBlock>
      
      <S.PublicationMainBlock>
        <Title
          margin='5px 0 15px'
        >
          {t('smallDescription')}
        </Title>
        <TextArea
          locale='uk'
          value={description.uk}
          onChange={changeHandler}
          name='description'
          id='descriptionUk'
          height='200px'
          margin='0'
          padding='10px'
          fz={16}
          placeholder={`${t('ukrainian')}`}
          label={`${t('ukrainian')}`}
          isValid={touched?.description?.uk && !errors?.description?.uk}
          max={1500}
        />
        <ErrorMsg show={touched?.description?.uk && !!errors?.description?.uk} margin='5px 0 5px'>{errors?.description?.uk}</ErrorMsg>
        <TextArea
          locale='en'
          value={description.en}
          onChange={changeHandler}
          name='description'
          id='descriptionEn'
          height='200px'
          margin='0'
          padding='10px'
          fz={16}
          placeholder={`${t('english')}`}
          label={`${t('english')}`}
          isValid={touched?.description?.en && !errors?.description?.en}
          max={1500}
        />
        <ErrorMsg show={touched?.description?.en && !!errors?.description?.en} margin='5px 0 5px'>{errors?.description?.en}</ErrorMsg>
      </S.PublicationMainBlock>
      
    </div>
  );
};

export default MainInfo;
