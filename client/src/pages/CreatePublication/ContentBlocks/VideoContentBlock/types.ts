import { IVideoContentBlock } from '@src/types/createPublicationTypes';
import { ChangeEvent } from 'react';

export interface IVideoContentBlockProps {
  contentBlock: IVideoContentBlock,
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void,
}
