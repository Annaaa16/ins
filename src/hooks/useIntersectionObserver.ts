import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const containerObserverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = observerRef.current;

    if (node == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { ...options, root: containerObserverRef.current },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return { observerRef, containerObserverRef, isIntersecting };
};
