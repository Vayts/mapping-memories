import React from 'react';
import SanitizeHTML from '@src/components/SanitizeHTML/SanitizeHTML';
import { ITextContentProps } from '@src/pages/PublicationPage/PublicationContent/TextContent/types';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/core/selectors';
import * as S from './style';

const TextContent: React.FC<ITextContentProps> = ({ contentBlock }) => {
  const { content } = contentBlock;
  const locale = useAppSelector(selectLocale);
  
  return (
    <S.TextContentWrapper>
      <SanitizeHTML html={content.text[locale]}/>
    </S.TextContentWrapper>
  );
};

export default TextContent;
