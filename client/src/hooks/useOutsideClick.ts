import { RefObject, useEffect } from 'react';

export function useOutsideClick(ref: RefObject<HTMLElement>, func: () => void, spectate = null): void {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        func();
      }
    }
		
    document.addEventListener('mousedown', handleClick);
		
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, spectate]);
}
