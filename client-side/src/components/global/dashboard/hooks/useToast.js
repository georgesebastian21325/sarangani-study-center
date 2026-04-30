import { useCallback, useState } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success', duration = 3200) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, exiting: true } : toast
        )
      );
      setTimeout(
        () => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
        250
      );
    }, duration);
  }, []);

  return { toasts, show };
};

