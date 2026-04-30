import { useCallback, useState } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success', duration = 3200) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((p) =>
        p.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 250);
    }, duration);
  }, []);

  return { toasts, show };
};

