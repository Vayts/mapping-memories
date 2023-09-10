import { IPublicationContentBlock } from '@src/types/createPublication.types';

export const PUBLICATION_BLOCK_TYPES = {
  Y_VIDEO: 'yVideo',
  TEXT: 'text',
  PHOTO: 'photo',
  PDF: 'pdf',
};

export const PUBLICATION_CONTENT_BLOCKS: IPublicationContentBlock[] = [
  {
    type: PUBLICATION_BLOCK_TYPES.Y_VIDEO,
    content: {
      link: '',
      description: {
        uk: '',
        en: '',
      },
    },
  },
  {
    type: PUBLICATION_BLOCK_TYPES.TEXT,
    content: {
      text: {
        uk: '',
        en: '',
      },
    },
  },
  {
    type: PUBLICATION_BLOCK_TYPES.PHOTO,
    content: {
      photo: null,
      source: '',
      description: {
        uk: '',
        en: '',
      },
    },
  },
  {
    type: PUBLICATION_BLOCK_TYPES.PDF,
    content: {
      file: null,
    },
  },
];
