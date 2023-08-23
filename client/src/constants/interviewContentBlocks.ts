export interface IInterviewContentBlock {
  type: string,
  content: Record<string, any>
}

export const INTERVIEW_BLOCK_TYPES = {
  Y_VIDEO: 'yVideo',
  TEXT: 'text',
  PHOTO: 'photo',
};

export const INTERVIEW_CONTENT_BLOCKS: IInterviewContentBlock[] = [
  {
    type: INTERVIEW_BLOCK_TYPES.Y_VIDEO,
    content: {
      link: '',
      description: {
        uk: '',
        en: '',
      },
    },
  },
  {
    type: INTERVIEW_BLOCK_TYPES.TEXT,
    content: {
      text: {
        uk: '',
        en: '',
      },
    },
  },
  {
    type: INTERVIEW_BLOCK_TYPES.PHOTO,
    content: {
      photo: null,
      source: '',
      description: {
        uk: '',
        en: '',
      },
    },
  },
];
