import { IVideoContentBlock } from '@src/types/createInterviewTypes';
import { ChangeEvent } from 'react';

export interface IVideoContentBlockProps {
  contentBlock: IVideoContentBlock,
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void,
}
