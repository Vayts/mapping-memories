import { IAdminMemorialType } from '@src/types/markers.types';

export interface IEditMemorialTypeProps {
  onClose: () => void;
  type: IAdminMemorialType,
}
