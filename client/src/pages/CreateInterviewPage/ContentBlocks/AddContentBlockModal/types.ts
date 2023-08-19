import React, { SetStateAction } from 'react';
import { ICreateRecipeContentBlock } from '@src/types/createInterviewTypes';

export interface IAddContentBlockProps {
  setContentBlocks: React.Dispatch<SetStateAction<ICreateRecipeContentBlock[]>>,
  setModal: React.Dispatch<SetStateAction<boolean>>
}

export interface IAddContentBlockStyle {
  checked: boolean,
}
