import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IAddMemorialState } from '@src/types/markers.types';
import Input from '@src/components/UI/Input/Input';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import Title from '@src/components/UI/Title/Title';
import TextArea from '@src/components/UI/TextArea/TextArea';
import { IEditPhotoState } from '@src/components/EditPhoto/types';
import { useTranslation } from 'react-i18next';
import { IAddEditMemorialPageProps } from '@src/pages/AddEditMemorialPage/types';
import Button from '@src/components/UI/Button/Button';
import EditPhoto from '@src/components/EditPhoto/EditPhoto';
import FileUploader from '@src/components/UI/FileUploader/FileUploader';
import { BASE_URL } from '@src/api/axios';
import { v4 as uuidv4 } from 'uuid';
import Select from '@src/components/UI/Select/Select';
import {
  addMemorialMarkersRequest, editMemorialMarkerRequest,
  getAllMemorialTypesRequest,
  getCityMarkersRequest,
  getCurrentMemorialRequest,
} from '@src/store/adminMarkers/action';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { MEMORIAL_VALIDATION } from '@constants/addMemorial';
import {
  selectAdminCityMarkers,
  selectAdminMemorialTypes, selectCurrentMemorial, selectIsAddEditCompleted,
  selectIsMarkersLoading,
} from '@src/store/adminMarkers/selectors';
import { getMemorialMarkerValidation } from '@src/validation/createMemorial.validation';
import { MEMORIAL_ICONS } from '@constants/memorialIcons';
import { STATIC_HREF } from '@constants/app';
import { getCreateMemorialDTO } from '@helpers/createMemorial.helper';
import { getNotification } from '@src/notification/notifications';
import { Loader } from '@src/components/Loader/Loader';
import { setCurrentMemorial, setIsAddEditCompleted } from '@src/store/adminMarkers/reducer';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './style';

const initialImage = 'memorialBlue.svg';

export type LocaleFieldsMemorial = 'title' | 'description' | 'address';

const initialValue: IAddMemorialState = {
  title: {
    uk: '',
    en: '',
  },
  description: {
    uk: '',
    en: '',
  },
  address: {
    uk: '',
    en: '',
  },
  icon: initialImage,
  lat: '',
  lng: '',
  link: '',
  city_id: '',
  type_id: '',
  photo: null,
  photo_source: '',
  errors: {},
  touched: {},
};

const editPhotoInitial = {
  isOpen: false,
  photo: null,
  photoBlob: null,
  width: 500,
  height: 200,
  border: 60,
  saveFunc: () => null,
  photoName: 'firstPhoto',
};

const AddEditMemorialPage: React.FC<IAddEditMemorialPageProps> = ({ isInEditMode }) => {
  const [values, setValues] = useState<IAddMemorialState>(initialValue);
  const [isPhotoChanged, setPhotoChanged] = useState(false);
  const { id } = useParams();
  const [editPhotoState, setEditPhoto] = useState<IEditPhotoState>(editPhotoInitial);
  const [photoBlob, setPhotoBlob] = useState<null | string>(null);
  const currentMemorial = useAppSelector(selectCurrentMemorial);
  const isAddEditCompleted = useAppSelector(selectIsAddEditCompleted);
  const isLoading = useAppSelector(selectIsMarkersLoading);
  const memorialTypes = useAppSelector(selectAdminMemorialTypes);
  const cities = useAppSelector(selectAdminCityMarkers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    if (isInEditMode) {
      dispatch(getCurrentMemorialRequest(id as string));
    }
    
    dispatch(getAllMemorialTypesRequest());
    dispatch(getCityMarkersRequest());
    
    return () => {
      dispatch(setIsAddEditCompleted(false));
      dispatch(setCurrentMemorial(null));
    };
  }, []);
  
  useEffect(() => {
    if (currentMemorial) {
      setValues(Object.assign(initialValue, currentMemorial));
    }
  }, [currentMemorial]);
  
  useEffect(() => {
    if (isAddEditCompleted) {
      navigate('/mapmem-admin/memorials');
    }
  }, [isAddEditCompleted]);
  
  const setMainPhotoHandler = useCallback((photo: any) => {
    setValues((state: IAddMemorialState) => {
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
  
  const removePhoto = useCallback(() => {
    setValues((state: IAddMemorialState) => {
      return {
        ...state,
        photo: null,
      };
    });
    setPhotoBlob(null);
  }, []);
  
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const language: string | undefined = e.target.dataset.language;
    
    setValues((prev: IAddMemorialState) => {
      const newState = {
        ...prev,
        touched: {
          ...prev.touched,
          [name]: language
            ? {
              ...prev.touched[name as LocaleFieldsMemorial],
              [language]: true,
            }
            : true,
        },
        [name]: language
          ? {
            ...prev[name as LocaleFieldsMemorial],
            [language]: value,
          }
          : value,
      };
      
      return {
        ...newState,
        errors: getMemorialMarkerValidation(newState),
      };
    });
  }, []);
  
  const typeChangeHandler = useCallback((value: string) => {
    const selectedItem = memorialTypes.find((item) => item.name.uk === value);

    setValues((prev: IAddMemorialState) => {
      const newState: IAddMemorialState = {
        ...prev,
        touched: {
          ...prev.touched,
          type_id: true,
        },
        type_id: selectedItem?._id as string,
      };

      return {
        ...newState,
        errors: getMemorialMarkerValidation(newState),
      };
    });
  }, [memorialTypes]);
  
  const cityChangeHandler = useCallback((value: string) => {
    const selectedItem = cities.find((item) => item.name.uk === value);
    
    setValues((prev: IAddMemorialState) => {
      const newState: IAddMemorialState = {
        ...prev,
        touched: {
          ...prev.touched,
          city: true,
        },
        city_id: selectedItem?._id as string,
      };
      
      return {
        ...newState,
        errors: getMemorialMarkerValidation(newState),
      };
    });
  }, [cities]);
  
  const iconChangeHandler = useCallback((value: string) => {
    setValues((prev: IAddMemorialState) => {
      const newState: IAddMemorialState = {
        ...prev,
        touched: {
          ...prev.touched,
          icon: true,
        },
        icon: value,
      };
      
      return {
        ...newState,
        errors: getMemorialMarkerValidation(newState),
      };
    });
  }, []);
  
  const onSubmitHandler = () => {
    if (Object.keys(values.errors).length === 0 && Object.keys(values.touched).length > 0) {
      const dto = getCreateMemorialDTO(values);
      
      if (isInEditMode) {
        dispatch(editMemorialMarkerRequest(dto, id as string));
      } else {
        dispatch(addMemorialMarkersRequest(dto));
      }
    } else {
      getNotification(t('checkDataError'), 'error');
    }
  };
  
  return (
    <S.AddMemorialWrapper>
      
      {editPhotoState.isOpen
        ? (
          <EditPhoto
            state={editPhotoState}
            setState={setEditPhoto}
          />
        ) : null}
      
      <S.AddMemorialControlsWrapper>
        <Title
          margin='0'
          fz={30}
        >
          {t('addMemorial')}
        </Title>
        <Button
          text={t('send')}
          clickHandler={onSubmitHandler}
          isLoading={isLoading}
          disabled={false}
        />
      </S.AddMemorialControlsWrapper>
      
      {isLoading ? <Loader/> : (
        <>
          <S.AddMemorialBlock>
            <Title
              margin='5px 0 15px'
            >
              {`${t('photo')} (${t('optional')})`}
            </Title>
            <S.AddMemorialPhotoWrapper>
              <FileUploader
                id='photo'
                onChange={openEditPhoto}
                name='photo'
                value={isInEditMode && !isPhotoChanged && values.photo ? `${BASE_URL}/file/download/photo?id=${values.photo}` : photoBlob}
                margin='0 0 20px'
              />
            </S.AddMemorialPhotoWrapper>
            <ErrorMsg show={values.touched?.photo && !!values.errors?.photo} margin='5px 0 5px'>{values.errors?.photo}</ErrorMsg>
            <Button
              margin='15px 0 0'
              text={t('deletePhoto')}
              clickHandler={removePhoto}
              disabled={values.photo === null}
            />
            <Input
              id="link"
              name="photo_source"
              width="100%"
              value={values.photo_source}
              margin="10px 0 5px"
              onChange={onChangeHandler}
              label={`${t('source')} (${t('optional')})`}
              placeholder={t('source')}
              isValid={values.touched?.photo_source && !values.errors?.photo_source}
              fz={16}
              height="30px"
              padding="10px"
            />
            <ErrorMsg show={values.touched?.photo_source && !!values.errors?.photo_source} margin="5px 0 5px">{values.errors?.photo_source}</ErrorMsg>
          </S.AddMemorialBlock>
        
          <S.AddMemorialBlock>
            <Title
              margin='5px 0 15px'
            >
              {t('memorialTitle')}
            </Title>
            <Input
              locale="uk"
              id="nameUk"
              name="title"
              width="100%"
              value={values.title.uk}
              margin="0 0 5px"
              onChange={onChangeHandler}
              label={`${t('ukrainian')}`}
              placeholder={`${t('ukrainian')}`}
              isValid={values.touched?.title?.uk && !values.errors?.title?.uk}
              fz={16}
              height="30px"
              padding="10px"
              min={MEMORIAL_VALIDATION.TITLE_MIN}
            />
            <ErrorMsg show={values.touched?.title?.uk && !!values.errors?.title?.uk} margin="5px 0 5px">
              {values.errors?.title?.uk}
            </ErrorMsg>
            <Input
              locale="en"
              id="nameEn"
              name="title"
              width="100%"
              value={values.title.en}
              margin="0 0 5px"
              onChange={onChangeHandler}
              label={`${t('english')}`}
              placeholder={`${t('english')}`}
              isValid={values.touched?.title?.en && !values.errors?.title?.en}
              fz={16}
              height="30px"
              padding="10px"
              min={MEMORIAL_VALIDATION.TITLE_MIN}
            />
            <ErrorMsg show={values.touched?.title?.en && !!values.errors?.title?.en} margin="5px 0 5px">
              {values.errors?.title?.en}
            </ErrorMsg>
          </S.AddMemorialBlock>
        
          <S.AddMemorialBlock>
            <Title
              margin='5px 0 15px'
            >
              {t('icon')}
            </Title>
            <S.AddMemorialIconWrapper>
              <img src={`${STATIC_HREF}/${values.icon}`} alt={values.icon}/>
            </S.AddMemorialIconWrapper>
            <Select
              selected={values.icon}
              name='typeSelect'
              id='typeSelect'
              isValid={values.touched?.type_id && !values.errors?.type_id}
              onChange={iconChangeHandler}
              placeholder={t('icon')}
              valueArr={MEMORIAL_ICONS}
              isNotDeletable
            />
            <ErrorMsg show={values.touched?.type_id && !!values.errors?.type_id} margin='5px 0 5px'>{values.errors?.type_id}</ErrorMsg>
          </S.AddMemorialBlock>
        
          <S.AddMemorialBlock>
            <Title
              margin='5px 0 15px'
            >
              {t('coords')}
            </Title>
            <Input
              id="lat"
              name="lat"
              width="100%"
              value={values.lat}
              margin="0 0 5px"
              onChange={onChangeHandler}
              label={`${t('lat')}`}
              placeholder={`${t('lat')}`}
              isValid={values.touched?.lat && !values.errors?.lat}
              fz={16}
              height="30px"
              padding="10px"
            />
            <ErrorMsg show={values.touched?.lat && !!values.errors?.lat} margin="5px 0 5px">
              {values.errors?.lat}
            </ErrorMsg>
            <Input
              id="lng"
              name="lng"
              width="100%"
              value={values.lng}
              margin="0 0 5px"
              onChange={onChangeHandler}
              label={`${t('lng')}`}
              placeholder={`${t('lng')}`}
              isValid={values.touched?.lng && !values.errors?.lng}
              fz={16}
              height="30px"
              padding="10px"
            />
            <ErrorMsg show={values.touched?.lng && !!values.errors?.lng} margin="5px 0 5px">
              {values.errors?.lng}
            </ErrorMsg>
          </S.AddMemorialBlock>
        
          <S.AddMemorialBlock>
            <Title
              margin='5px 0 15px'
            >
              {`${t('memorialType')} (${t('optional')})`}
            </Title>
            <Select
              selected={memorialTypes.find((item) => item._id === values.type_id)?.name.uk as string}
              name='typeSelect'
              id='typeSelect'
              isValid={values.touched?.type_id && !values.errors?.type_id}
              onChange={typeChangeHandler}
              placeholder={t('publicationType')}
              valueArr={memorialTypes.map((item) => item.name.uk)}
            />
            <ErrorMsg show={values.touched?.type_id && !!values.errors?.type_id} margin='5px 0 5px'>{values.errors?.type_id}</ErrorMsg>
          </S.AddMemorialBlock>
        
          <S.AddMemorialBlock>
            <Title
              margin='5px 0 15px'
            >
              {`${t('city')} (${t('optional')})`}
            </Title>
            <Select
              selected={cities.find((item) => item._id === values.city_id)?.name.uk as string}
              name='city_id'
              id='typeSelect'
              isValid={values.touched?.city_id && !values.errors?.city_id}
              onChange={cityChangeHandler}
              placeholder={t('city')}
              valueArr={cities.map((item) => item.name.uk)}
            />
            <ErrorMsg show={values.touched?.city_id && !!values.errors?.city_id} margin='5px 0 5px'>{values.errors?.city_id}</ErrorMsg>
          </S.AddMemorialBlock>
        
          <S.AddMemorialBlock>
            <Title
              margin="5px 0 15px"
            >
              {t('smallDescription')}
            </Title>
            <TextArea
              locale="uk"
              value={values.description.uk}
              onChange={onChangeHandler}
              name="description"
              id="descriptionUk"
              height="200px"
              margin="0"
              padding="10px"
              fz={16}
              placeholder={`${t('ukrainian')}`}
              label={`${t('ukrainian')}`}
              isValid={values.touched?.description?.uk && !values.errors?.description?.uk}
              max={1500}
            />
            <ErrorMsg
              show={values.touched?.description?.uk && !!values.errors?.description?.uk}
              margin="5px 0 5px"
            >
              {values.errors?.description?.uk}
            </ErrorMsg>
          
            <TextArea
              locale="en"
              value={values.description.en}
              onChange={onChangeHandler}
              name="description"
              id="descriptionEn"
              height="200px"
              margin="0"
              padding="10px"
              fz={16}
              placeholder={`${t('english')}`}
              label={`${t('english')}`}
              isValid={values.touched?.description?.en && !values.errors?.description?.en}
              max={1500}
            />
            <ErrorMsg
              show={values.touched?.description?.en && !!values.errors?.description?.en}
              margin="5px 0 5px"
            >
              {values.errors?.description?.en}
            </ErrorMsg>
          </S.AddMemorialBlock>
        
          <S.AddMemorialBlock>
            <Title
              margin="5px 0 15px"
            >
              {t('address')}
            </Title>
            <Input
              locale="uk"
              id="addressUk"
              name="address"
              width="100%"
              value={values.address.uk}
              margin="0 0 5px"
              onChange={onChangeHandler}
              label={`${t('ukrainian')}`}
              placeholder={`${t('ukrainian')}`}
              isValid={values.touched?.address?.uk && !values.errors?.address?.uk}
              fz={16}
              height="30px"
              padding="10px"
              min={MEMORIAL_VALIDATION.TITLE_MIN}
            />
            <ErrorMsg
              show={values.touched?.address?.uk && !!values.errors?.address?.uk}
              margin="5px 0 5px"
            >
              {values.errors?.address?.uk}
            </ErrorMsg>
          
            <Input
              locale="en"
              id="addressEn"
              name="address"
              width="100%"
              value={values.address.en}
              margin="0 0 5px"
              onChange={onChangeHandler}
              label={`${t('english')}`}
              placeholder={`${t('english')}`}
              isValid={values.touched?.address?.en && !values.errors?.address?.en}
              fz={16}
              height="30px"
              padding="10px"
              min={MEMORIAL_VALIDATION.TITLE_MIN}
            />
            <ErrorMsg show={values.touched?.title?.en && !!values.errors?.title?.en} margin="5px 0 5px">{values.errors?.title?.en}</ErrorMsg>
          </S.AddMemorialBlock>
        
          <S.AddMemorialBlock>
            <Title
              margin='5px 0 15px'
            >
              {t('readMore')}
            </Title>
            <Input
              id="readMore"
              name="link"
              width="100%"
              value={values.link}
              margin="0 0 5px"
              onChange={onChangeHandler}
              placeholder={`${t('readMore')}`}
              isValid={values.touched?.link && !values.errors?.link}
              fz={16}
              height="30px"
              padding="10px"
            />
            <ErrorMsg show={values.touched?.link && !!values.errors?.link} margin="5px 0 5px">{values.errors?.link}</ErrorMsg>
          </S.AddMemorialBlock>
        </>
      )}
    </S.AddMemorialWrapper>
  );
};

export default AddEditMemorialPage;
