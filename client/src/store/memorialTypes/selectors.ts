import { RootState } from '@src/store';
import { memorialTypesAdapter } from '@src/store/memorialTypes/slice';

export const {
  selectAll: selectAllMemorialTypes,
} = memorialTypesAdapter.getSelectors((state: RootState) => state.memorialTypes);
