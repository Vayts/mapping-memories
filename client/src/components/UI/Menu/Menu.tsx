import React, { useRef, useState } from 'react';
import { MenuContent, MenuIcon, MenuWrapper } from '@src/components/UI/Menu/style';
import { IMenu } from '@src/components/UI/Menu/types';
import { useOutsideClick } from '@src/hooks/useOutsideClick';

export const Menu: React.FC<IMenu> = ({ icon, children }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
	
  useOutsideClick(menuRef, () => setOpen(false));
  
  const openMenuHandler = () => {
    if (!isOpen) {
      setOpen(true);
    }
  };
	
  return (
    <MenuWrapper ref={menuRef} isOpen={isOpen}>
      <MenuIcon className={icon || 'icon-more'} onClick={openMenuHandler}/>
      <MenuContent isOpen={isOpen}>
        {children}
      </MenuContent>
    </MenuWrapper>
  );
};
