import { publicationsAdapter } from '@src/store/publications/slice';
import { RootState } from '@src/store';

export const {
  selectAll: selectAllPublications,
} = publicationsAdapter.getSelectors((state: RootState) => state.publications);
