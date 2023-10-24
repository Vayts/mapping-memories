import { RootState } from '@src/store';
import { memorialsAdapter } from '@src/store/memorials/slice';

export const {
  selectAll: selectAllMemorials,
} = memorialsAdapter.getSelectors((state: RootState) => state.memorials);
