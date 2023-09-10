import React from 'react';
import { ITagProps } from '@src/components/Tag/types';
import * as S from './style';

const Tag: React.FC<ITagProps> = ({ text, color }) => {
  return (
    <S.TagWrapper color={color}>
      <S.TagText>
        {text}
      </S.TagText>
    </S.TagWrapper>
  );
};

export default Tag;
