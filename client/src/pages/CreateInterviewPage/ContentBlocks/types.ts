import React, { SetStateAction } from 'react';
import { ICreateRecipeContentBlock } from '@src/types/createInterviewTypes';

export interface IContentBlocksProps {
  contentBlocks: ICreateRecipeContentBlock[],
  setContentBlocks: React.Dispatch<SetStateAction<ICreateRecipeContentBlock[]>>,
}
