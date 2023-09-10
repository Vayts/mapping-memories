import React, { ChangeEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectIsMarkersLoading } from '@src/store/adminMarkers/selectors';
import { ICreateMemorialTypeState } from '@src/types/markers.types';
import { useTranslation } from 'react-i18next';
import { getMemorialTypeDTO } from '@helpers/markers.helper';
import { addMemorialTypeRequest } from '@src/store/adminMarkers/action';
import { IAddMemorialTypeProps } from '@src/pages/AdminMemorialTypesPage/AddMemorialTypeModal/types';
import { getMemorialTypeValidation } from '@src/validation/createMemorialType.validation';
import Title from '@src/components/UI/Title/Title';
import Input from '@src/components/UI/Input/Input';
import ErrorMsg from '@src/components/UI/ErrorMsg/ErrorMsg';
import { MEMORIAL_TYPE_VALIDATION } from '@constants/createMeorialType';
import Button from '@src/components/UI/Button/Button';
import * as S from './style';

const initialValue: ICreateMemorialTypeState = {
  name: {
    uk: '',
    en: '',
  },
  touched: {},
  errors: {},
};

const AddMemorialTypeModal: React.FC<IAddMemorialTypeProps> = ({ onClose }) => {
  const isLoading = useAppSelector(selectIsMarkersLoading);
  const [values, setValues] = useState<ICreateMemorialTypeState>(initialValue);
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
        errors: getMemorialTypeValidation(newState),
      };
    });
  }, []);
  
  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (Object.values(values.errors).length === 0) {
      const data = getMemorialTypeDTO(values);
      
      onClose();
      dispatch(addMemorialTypeRequest(data));
    }
  };
  
  return (
    <S.AddMemorialTypeModalWrapper>
      <Title align='center'>{t('addMemorialType')}</Title>
      <Title fz={16}>{t('typeName')}</Title>
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
          min={MEMORIAL_TYPE_VALIDATION.NAME_MIN}
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
          min={MEMORIAL_TYPE_VALIDATION.NAME_MIN}
        />
        <ErrorMsg show={values.touched?.name?.en && !!values.errors?.name?.en} margin='5px 0 5px'>{values.errors?.name?.en}</ErrorMsg>
        <Button
          margin='10px auto'
          text={t('send')}
          clickHandler={onSubmitHandler}
          isLoading={isLoading}
          disabled={isButtonDisabled}
        />
      </form>
    </S.AddMemorialTypeModalWrapper>
  );
};

export default AddMemorialTypeModal;
