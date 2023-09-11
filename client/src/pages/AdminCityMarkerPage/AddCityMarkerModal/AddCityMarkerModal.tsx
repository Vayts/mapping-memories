import React, { ChangeEvent, useCallback, useState } from 'react';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import { PUBLICATION_VALIDATION } from '@constants/createPublication';
import Input from '@src/components/UI/Input/Input';
import { ICreateCityMarkerState } from '@src/types/markers.types';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import Button from '@src/components/UI/Button/Button';
import { getCityMarkerValidation } from '@src/validation/createCityMarker.validation';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectIsMarkersLoading } from '@src/store/adminMarkers/selectors';
import { getCityMarkerDTO } from '@helpers/markers.helper';
import { IAddCityMarkerModalProps } from '@src/pages/AdminCityMarkerPage/AddCityMarkerModal/types';
import { addCityMarkerRequest } from '@src/store/cityMarkers/action';
import * as S from './style';

const initialValue: ICreateCityMarkerState = {
  name: {
    uk: '',
    en: '',
  },
  lat: '',
  lng: '',
  touched: {},
  errors: {},
};

const AddCityMarkerModal: React.FC<IAddCityMarkerModalProps> = ({ onClose }) => {
  const isLoading = useAppSelector(selectIsMarkersLoading);
  const [values, setValues] = useState<ICreateCityMarkerState>(initialValue);
  const isButtonDisabled = Object.keys(values.touched).length === 0 || Object.values(values.errors).length > 0;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const language: string | undefined = e.target.dataset.language;
    
    setValues((prev) => {
      const newState = {
        ...prev,
        touched: {
          ...prev.touched,
          [name]: language
            ? {
              ...prev.touched[name],
              [language]: true,
            }
            : true,
        },
        [name]: language
          ? {
            ...prev[name as 'name'],
            [language]: value,
          }
          : value,
      };
      
      return {
        ...newState,
        errors: getCityMarkerValidation(newState),
      };
    });
  }, []);
  
  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (Object.values(values.errors).length === 0) {
      const data = getCityMarkerDTO(values);
      
      onClose();
      dispatch(addCityMarkerRequest(data));
    }
  };
  
  return (
    <S.AddCityMarkerModalWrapper>
      <Title align='center'>{t('addCityMarker')}</Title>
      <Title fz={16}>{t('cityName')}</Title>
      <form>
        <Input
          locale='uk'
          id='nameUk'
          name='name'
          value={values.name.uk}
          margin='0 0 5px'
          onChange={onChangeHandler}
          placeholder={`${t('ukrainian')}`}
          isValid={values.touched?.name?.uk && !values.errors?.name?.uk}
          fz={16}
          height='30px'
          padding='10px'
          min={PUBLICATION_VALIDATION.LIMIT.TITLE_MIN}
        />
        <ErrorMsg show={values.touched?.name?.uk && !!values.errors?.name?.uk} margin='5px 0 5px'>{values.errors?.name?.uk}</ErrorMsg>
        <Input
          locale='en'
          id='nameEn'
          name='name'
          value={values.name.en}
          margin='0 0 5px'
          onChange={onChangeHandler}
          placeholder={`${t('english')}`}
          isValid={values.touched?.name?.en && !values.errors?.name?.en}
          fz={16}
          height='30px'
          padding='10px'
          min={PUBLICATION_VALIDATION.LIMIT.TITLE_MIN}
        />
        <ErrorMsg show={values.touched?.name?.en && !!values.errors?.name?.en} margin='5px 0 5px'>{values.errors?.name?.en}</ErrorMsg>
        <Input
          id='lat'
          name='lat'
          value={values.lat}
          margin='10px 0 5px'
          onChange={onChangeHandler}
          placeholder={`${t('lat')}`}
          label={`${t('lat')}`}
          isValid={values.touched?.lat && !values.errors?.lat}
          fz={16}
          height='30px'
          padding='10px'
          min={PUBLICATION_VALIDATION.LIMIT.TITLE_MIN}
        />
        <ErrorMsg show={values.touched?.lat && !!values.errors?.lat} margin='5px 0 5px'>{values.errors?.lat}</ErrorMsg>
        <Input
          id='lng'
          name='lng'
          value={values.lng}
          margin='0 0 5px'
          onChange={onChangeHandler}
          placeholder={`${t('lng')}`}
          label={`${t('lng')}`}
          isValid={values.touched?.lng && !values.errors?.lng}
          fz={16}
          height='30px'
          padding='10px'
          min={PUBLICATION_VALIDATION.LIMIT.TITLE_MIN}
        />
        <ErrorMsg show={values.touched?.lng && !!values.errors?.lng} margin='5px 0 5px'>{values.errors?.lng}</ErrorMsg>
        <Button
          margin='10px auto'
          text={t('send')}
          clickHandler={onSubmitHandler}
          isLoading={isLoading}
          disabled={isButtonDisabled}
        />
      </form>
    </S.AddCityMarkerModalWrapper>
  );
};

export default AddCityMarkerModal;
