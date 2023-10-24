import React, { useState } from 'react';
import Title from '@src/components/UI/Title/Title';
import Button from '@src/components/UI/Button/Button';
import MainInfo from '@src/components/MainInfo/MainInfo';
import { ICreatePublicationContentBlock, ICreatePublicationMain } from '@src/types/createPublication.types';
import { useAppDispatch } from '@src/hooks/hooks';
import { getCreatePublicationTotalValidation } from '@src/validation/createPublication.validation';
import { IEditPublicationMainProps } from '@src/pages/EditPublicationPage/EditPublicationMain/types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { convertPublicationDataToEditFormatMain, covertPublicationDataToEditFormatContentBlocks } from '@helpers/editPublication.helper';
import { getCreatePublicationDTO } from '@helpers/createPublication.helper';
import ContentBlocks from '@src/components/ContentBlocks/ContentBlocks';
import { editPublication } from '@src/store/publications/thunks';
import { errorManager } from '@helpers/error.helper';
import * as S from './style';

const EditPublicationMain: React.FC<IEditPublicationMainProps> = ({ publication }) => {
  const [mainInfo, setMainInfo] = useState<ICreatePublicationMain>(convertPublicationDataToEditFormatMain(publication));
  const [
    contentBlocks,
    setContentBlocks,
  ] = useState<ICreatePublicationContentBlock[]>(covertPublicationDataToEditFormatContentBlocks(publication.contentBlocks));
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (getCreatePublicationTotalValidation(mainInfo, contentBlocks)) {
      const values = getCreatePublicationDTO(mainInfo, contentBlocks);
      setLoading(true);
      dispatch(editPublication({ values, id: publication._id }))
        .unwrap()
        .then(() => navigate('/mapmem-admin/publications'))
        .catch(errorManager)
        .finally(() => setLoading(false));
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
