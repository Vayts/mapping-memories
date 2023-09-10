import { IPdfContentBlock } from '@src/types/createPublication.types';

export interface IPdfContentBlockProps {
  onChange: (value: File | null, id: string, name: string) => void,
  contentBlock: IPdfContentBlock,
  isInEditMode?: boolean,
}
