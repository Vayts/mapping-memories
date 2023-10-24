import React from 'react';
import { IVideoContentProps } from '@src/pages/PublicationPage/PublicationContent/VideoContent/types';
import Description from '@src/components/UI/Description/Description';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/core/selectors';
import * as S from './style';

const VideoContent: React.FC<IVideoContentProps> = ({ contentBlock }) => {
  const { content } = contentBlock;
  const { link, description } = content;
  const locale = useAppSelector(selectLocale);
  
  return (
    <S.VideoContentWrapper>
      <S.VideoContentIframe
        src={link}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      {description && (
        <Description margin='5px 0 10px' align='center'>
          {description[locale]}
        </Description>
      )}
    </S.VideoContentWrapper>
  );
};

export default VideoContent;
