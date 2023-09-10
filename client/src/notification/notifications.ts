import { toast } from 'react-toastify';

export const getNotification = (msg: string, type = 'success'): void => {
  toast[type as 'success' | 'error'](msg, {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
