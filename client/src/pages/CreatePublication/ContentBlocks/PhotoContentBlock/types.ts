import { IPhotoContentBlock } from '@src/types/createPublicationTypes';
import { ChangeEvent } from 'react';

export interface IPhotoContentBlockProps {
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void,
  onPhotoSave: (value: File | null, id: string, name: string) => void,
  contentBlock: IPhotoContentBlock,
}
