import React, { SetStateAction } from 'react';
import { ICreatePublicationContentBlock } from '@src/types/createPublication.types';

export interface IContentBlocksProps {
  contentBlocks: ICreatePublicationContentBlock[],
  setContentBlocks: React.Dispatch<SetStateAction<ICreatePublicationContentBlock[]>>,
}
