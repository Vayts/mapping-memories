import React, { SetStateAction } from 'react';
import { ICreatePublicationMain } from '@src/types/createPublication.types';

export interface IMainInfoBlockProps {
  mainInfo: ICreatePublicationMain,
  setMainInfo: React.Dispatch<SetStateAction<ICreatePublicationMain>>,
}
