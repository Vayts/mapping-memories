import { EditorState } from 'draft-js';
import { LocaleType } from '@src/types/locale.types';

export interface ITextEditorProps {
  editorState: EditorState,
  onChange: (editor: EditorState, locale: LocaleType) => void,
  locale: LocaleType,
}
