// ! Gerado por IA
import React, { createContext, useState, useCallback } from "react";

export const ToastContext = createContext({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ type = "info", title, message, duration = 4000 }) => {
      const id = ++idCounter;
      const toast = { id, type, title, message };
      setToasts((prev) => [toast, ...prev]);

      if (duration > 0) {
        // start exit sequence after duration: mark as exiting, then remove after animation
        setTimeout(() => {
          setToasts((prev) =>
            prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
          );
          // remove after animation time (match CSS 220ms)
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
          }, 240);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id) => {
    // mark as exiting to play animation, then remove
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 240);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
