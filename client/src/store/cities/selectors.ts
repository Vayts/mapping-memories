import { RootState } from '@src/store';
import { citiesAdapter } from '@src/store/cities/slice';

export const {
  selectAll: selectAllCities,
} = citiesAdapter.getSelectors((state: RootState) => state.cities);
