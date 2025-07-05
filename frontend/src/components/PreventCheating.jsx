import { useEffect } from 'react';

const PreventCheating = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === 'Backspace' &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
      }

      if (e.key === 'F5') {
        e.preventDefault();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault(); 
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null; 
};

export default PreventCheating;
