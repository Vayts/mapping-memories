import React, { memo, useCallback } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import './style.css';
import { ITextEditorProps } from '@src/components/UI/TextEditor/types';

const TextEditor: React.FC<ITextEditorProps> = ({ editorState, onChange, locale }) => {
  const changeHandler = useCallback((editor: EditorState) => {
    onChange(editor, locale);
  }, [editorState]);
  
  return (
    <>
      <Editor
        editorState={editorState}
        editorClassName='editor'
        toolbar={{
          options: ['inline', 'blockType', 'list', 'textAlign', 'link'],
          blockType: {
            inDropdown: false,
            options: ['Normal', 'H2', 'H3', 'Blockquote'],
          },
        }}
        onEditorStateChange={changeHandler}
      />
    </>
  );
};

export default memo(TextEditor);
