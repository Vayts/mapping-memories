export const PUBLICATION_TYPE_COLOR = {
  interview: '#6749a9',
  artProject: '#ff7e46',
  specialProject: '#C11574',
};

export const PUBLICATIONS_PAGE_CONFIG = {
  PER_PAGE: 6,
  interview: {
    favorite: 'favoriteInterviews',
    all: 'allInterviews',
    nothing: 'interviews',
  },
  artProject: {
    favorite: 'favoriteArtProjects',
    all: 'allArtProjects',
    nothing: 'nothingArtProjects',
  },
  specialProject: {
    favorite: 'favoriteSpecialProjects',
    all: 'allSpecialProjects',
    nothing: 'nothingSpecialProjects',
  },
  default: {
    all: 'allPublications',
    nothing: 'nothingPublications',
  },
};
