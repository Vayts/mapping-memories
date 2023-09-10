import { IAdminCityMarker } from '@src/types/markers.types';

export interface IEditCityMarkerModalProps {
  marker: IAdminCityMarker,
  onClose: () => void,
}
