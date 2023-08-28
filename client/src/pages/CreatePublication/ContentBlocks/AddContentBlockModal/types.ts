import React, { SetStateAction } from 'react';
import { ICreatePublicationContentBlock } from '@src/types/createPublicationTypes';

export interface IAddContentBlockProps {
  setContentBlocks: React.Dispatch<SetStateAction<ICreatePublicationContentBlock[]>>,
  setModal: React.Dispatch<SetStateAction<boolean>>
}

export interface IAddContentBlockStyle {
  checked: boolean,
}
