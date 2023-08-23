import React, { SetStateAction } from 'react';
import { ICreateInterviewContentBlock } from '@src/types/createInterviewTypes';

export interface IAddContentBlockProps {
  setContentBlocks: React.Dispatch<SetStateAction<ICreateInterviewContentBlock[]>>,
  setModal: React.Dispatch<SetStateAction<boolean>>
}

export interface IAddContentBlockStyle {
  checked: boolean,
}
