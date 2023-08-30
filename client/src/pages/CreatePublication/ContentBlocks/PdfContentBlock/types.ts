import { IPdfContentBlock } from '@src/types/createPublicationTypes';

export interface IPdfContentBlockProps {
  onChange: (value: File | null, id: string, name: string) => void,
  contentBlock: IPdfContentBlock,
}
