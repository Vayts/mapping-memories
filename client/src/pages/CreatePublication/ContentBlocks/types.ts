import React, { SetStateAction } from 'react';
import { ICreatePublicationContentBlock } from '@src/types/createPublicationTypes';

export interface IContentBlocksProps {
  contentBlocks: ICreatePublicationContentBlock[],
  setContentBlocks: React.Dispatch<SetStateAction<ICreatePublicationContentBlock[]>>,
}
