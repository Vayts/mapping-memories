import React, { useEffect, useState } from 'react';
import Title from '@src/components/UI/Title/Title';
import Button from '@src/components/UI/Button/Button';
import MainInfo from '@src/components/MainInfo/MainInfo';
import { ICreatePublicationContentBlock, ICreatePublicationMain } from '@src/types/createPublication.types';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectPublicationHasBeenEdited, selectEditPublicationLoading } from '@src/store/editPublication/selectors';
import { getCreatePublicationTotalValidation } from '@src/validation/createPublication.validation';
import { IEditPublicationMainProps } from '@src/pages/EditPublicationPage/EditPublicationMain/types';
import { useTranslation } from 'react-i18next';
import { editPublicationRequest } from '@src/store/editPublication/actions';
import { useNavigate } from 'react-router-dom';
import { convertPublicationDataToEditFormatMain, covertPublicationDataToEditFormatContentBlocks } from '@helpers/editPublication.helper';
import { getCreatePublicationDTO } from '@helpers/createPublication.helper';
import ContentBlocks from '@src/components/ContentBlocks/ContentBlocks';
import { setPublicationHasBeenEdited } from '@src/store/editPublication/reducer';
import * as S from './style';

const EditPublicationMain: React.FC<IEditPublicationMainProps> = ({ publication }) => {
  const [mainInfo, setMainInfo] = useState<ICreatePublicationMain>(convertPublicationDataToEditFormatMain(publication));
  const [
    contentBlocks,
    setContentBlocks,
  ] = useState<ICreatePublicationContentBlock[]>(covertPublicationDataToEditFormatContentBlocks(publication.contentBlocks));
  const hasBeenEdited = useAppSelector(selectPublicationHasBeenEdited);
  const isLoading = useAppSelector(selectEditPublicationLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    if (hasBeenEdited) {
      navigate('/mapmem-admin/publications');
    }
    
    return () => {
      dispatch(setPublicationHasBeenEdited(false));
    };
  }, [hasBeenEdited]);
  
  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (getCreatePublicationTotalValidation(mainInfo, contentBlocks)) {
      const values = getCreatePublicationDTO(mainInfo, contentBlocks);
      
      dispatch(editPublicationRequest(values, publication._id));
    }
  };
  
  return (
    <>
      <S.EditPublicationControlsWrapper>
        <Title
          margin='0'
          fz={30}
        >
          {t('editPublication')}
        </Title>
        <Button
          text={t('send')}
          clickHandler={submitHandler}
          isLoading={isLoading}
          disabled={isLoading}
          width='200px'
        />
      </S.EditPublicationControlsWrapper>
      <MainInfo
        isInEditMode
        mainInfo={mainInfo}
        setMainInfo={setMainInfo}
      />
      <ContentBlocks
        isInEditMode
        contentBlocks={contentBlocks}
        setContentBlocks={setContentBlocks}
      />
    </>
  );
};

export default EditPublicationMain;
