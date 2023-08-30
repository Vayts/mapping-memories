import React, { SetStateAction } from 'react';
import { ICreatePublicationMain } from '@src/types/createPublicationTypes';

export interface IMainInfoBlockProps {
  mainInfo: ICreatePublicationMain,
  setMainInfo: React.Dispatch<SetStateAction<ICreatePublicationMain>>,
}
