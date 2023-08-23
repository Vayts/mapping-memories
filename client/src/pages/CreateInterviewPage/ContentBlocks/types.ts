import React, { SetStateAction } from 'react';
import { ICreateInterviewContentBlock } from '@src/types/createInterviewTypes';

export interface IContentBlocksProps {
  contentBlocks: ICreateInterviewContentBlock[],
  setContentBlocks: React.Dispatch<SetStateAction<ICreateInterviewContentBlock[]>>,
}
