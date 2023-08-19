import React, { useEffect, useRef } from 'react';
import { hideScrollbar, showScrollbar } from '@helpers/visual.helper';
import { ModalBackground, ModalContent } from '@src/components/Modal/style';
import { useOutsideClick } from '@src/hooks/useOutsideClick';

interface ModalProps {
  children?: React.ReactNode;
  outsideHandler?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, outsideHandler }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    hideScrollbar();
    
    return () => {
      showScrollbar();
    };
  }, []);
  
  useOutsideClick(modalRef, outsideHandler || (() => null));
  
  return (
    <ModalBackground>
      <ModalContent ref={modalRef}>
        {children || null}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
