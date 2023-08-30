import { LocaleType } from '@src/types/types';
import { ITextContentBlock } from '@src/types/createPublicationTypes';

export interface ITextEditor {
  onChange: (name: string, value: string, locale: LocaleType, id: string) => void,
  contentBlock: ITextContentBlock,
}