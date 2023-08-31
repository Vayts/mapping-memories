import { LocaleType } from '@src/types/locale.types';
import { ITextContentBlock } from '@src/types/createPublication.types';

export interface ITextEditor {
  onChange: (name: string, value: string, locale: LocaleType, id: string) => void,
  contentBlock: ITextContentBlock,
}
