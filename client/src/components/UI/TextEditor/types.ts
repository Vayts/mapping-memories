import { EditorState } from 'draft-js';
import React, { SetStateAction } from 'react';
import { LocaleType } from '@src/types/types';

export interface ITextEditorProps {
  editorState: EditorState,
  onChange: (editor: EditorState, locale: LocaleType) => void,
  locale: LocaleType,
}
