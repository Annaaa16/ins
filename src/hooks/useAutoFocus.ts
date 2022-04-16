import { useEffect, useRef } from 'react';

export const useAutoFocus = (deps?: any[]) => {
  const focusRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const target = focusRef.current;

    if (!target) return;

    target.focus();
    target.setSelectionRange(target.value.length, target.value.length);
  }, [deps]);

  return { focusRef };
};
