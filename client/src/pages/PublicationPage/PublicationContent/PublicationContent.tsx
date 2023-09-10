import React from 'react';
import { IPublicationContentProps } from '@src/pages/PublicationPage/PublicationContent/types';
import { PUBLICATION_BLOCK_TYPES } from '@constants/publicationContentBlocks';
import PhotoContent from '@src/pages/PublicationPage/PublicationContent/PhotoContent/PhotoContent';
import {
  IPublicationContent, IPublicationPdfContent,
  IPublicationPhotoContent,
  IPublicationTextContent,
  IPublicationVideoContent,
} from '@src/types/publicationContent.types';
import TextContent from '@src/pages/PublicationPage/PublicationContent/TextContent/TextContent';
import VideoContent from '@src/pages/PublicationPage/PublicationContent/VideoContent/VideoContent';
import PdfContent from '@src/pages/PublicationPage/PublicationContent/PdfContent/PdfContent';
import * as S from './style';

const PublicationContent: React.FC<IPublicationContentProps> = ({ contentBlocks }) => {
  const generateContent = (block: IPublicationContent) => {
    switch (block.type) {
    case PUBLICATION_BLOCK_TYPES.PHOTO:
      return <PhotoContent contentBlock={block as IPublicationPhotoContent}/>;
    case PUBLICATION_BLOCK_TYPES.TEXT:
      return <TextContent contentBlock={block as IPublicationTextContent}/>;
    case PUBLICATION_BLOCK_TYPES.Y_VIDEO:
      return <VideoContent contentBlock={block as IPublicationVideoContent}/>;
    case PUBLICATION_BLOCK_TYPES.PDF:
      return <PdfContent contentBlock={block as IPublicationPdfContent} />;
    default:
      return null;
    }
  };
  
  return (
    <S.PublicationContentWrapper>
      {contentBlocks.map((item: IPublicationContent) => (
        <div key={item._id}>
          {generateContent(item)}
        </div>
      ))}
    </S.PublicationContentWrapper>
  );
};

export default PublicationContent;
