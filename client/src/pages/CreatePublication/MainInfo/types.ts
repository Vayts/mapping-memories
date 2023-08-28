import { ICreateInterviewMain } from '@src/types/createPublicationTypes';
import React, { SetStateAction } from 'react';

export interface IMainInfoBlockProps {
  mainInfo: ICreateInterviewMain,
  setMainInfo: React.Dispatch<SetStateAction<ICreateInterviewMain>>,
}
