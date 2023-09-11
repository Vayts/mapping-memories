import React, { ChangeEvent, useCallback, useState } from 'react';
import { ICreateCityMarkerState } from '@src/types/markers.types';
import Title from '@src/components/UI/Title/Title';
import Input from '@src/components/UI/Input/Input';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import Button from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { getCityMarkerValidation } from '@src/validation/createCityMarker.validation';
import { getCityMarkerDTO } from '@helpers/markers.helper';
import { IEditCityMarkerModalProps } from '@src/pages/AdminCityMarkerPage/EditCityMarkerModal/types';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { editCityMarkerRequest } from '@src/store/cityMarkers/action';
import { selectIsCityMarkersLoading } from '@src/store/cityMarkers/selectors';
import * as S from './style';

const EditCityMarkerModal: React.FC<IEditCityMarkerModalProps> = ({ marker, onClose }) => {
  const [values, setValues] = useState<ICreateCityMarkerState>({
    name: marker.name,
    errors: {},
    lat: marker.lat.toString(),
    lng: marker.lng.toString(),
    touched: {},
  });
  const isLoading = useAppSelector(selectIsCityMarkersLoading);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
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
      
      dispatch(editCityMarkerRequest(data, marker._id as string));
      onClose();
    }
  };
  
  return (
    <S.EditCityMarkerModalWrapper>
      <Title align='center'>{t('editCityMarker')}</Title>
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
        />
        <ErrorMsg show={values.touched?.lng && !!values.errors?.lng} margin='5px 0 5px'>{values.errors?.lng}</ErrorMsg>
        <Button
          margin='10px auto'
          text={t('send')}
          clickHandler={onSubmitHandler}
          isLoading={isLoading}
          disabled={Object.values(values.errors).length > 0}
        />
      </form>
    </S.EditCityMarkerModalWrapper>
  );
};

export default EditCityMarkerModal;
