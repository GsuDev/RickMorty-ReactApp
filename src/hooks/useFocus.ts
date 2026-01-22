import { useEffect, useRef } from "react";

// Hook para hacer focus automatico en un elemento al montar
export const useFocus = <T extends HTMLElement>() => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    // Pequeño timeout para asegurar que el elemento ya esta en el DOM
    const timer = setTimeout(() => {
      elementRef.current?.focus();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return elementRef;
};
