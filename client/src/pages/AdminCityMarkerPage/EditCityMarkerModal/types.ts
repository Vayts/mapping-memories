import { ICityMarker } from '@src/types/markers.types';

export interface IEditCityMarkerModalProps {
  marker: ICityMarker,
  onClose: () => void,
}
