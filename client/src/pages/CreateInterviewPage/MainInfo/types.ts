import { ICreateInterviewMain } from '@src/types/createInterviewTypes';
import React, { SetStateAction } from 'react';

export interface IMainInfoBlockProps {
  mainInfo: ICreateInterviewMain,
  setMainInfo: React.Dispatch<SetStateAction<ICreateInterviewMain>>,
}
