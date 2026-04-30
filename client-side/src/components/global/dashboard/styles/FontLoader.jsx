import { useEffect } from 'react';

export const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Cinzel:wght@400;600&family=Crimson+Text:wght@400;600&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);
  return null;
};

