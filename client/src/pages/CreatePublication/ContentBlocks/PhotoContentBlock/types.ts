import { IPhotoContentBlock } from '@src/types/createPublicationTypes';
import { ChangeEvent } from 'react';

export interface IPhotoContentBlockProps {
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void,
  onPhotoSave: (value: File | null, id: string) => void,
  contentBlock: IPhotoContentBlock,
}
