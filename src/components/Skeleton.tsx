import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

interface SkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  rounded?: boolean;
}

const Skeleton = ({ alt, src, rounded, className, ...rest }: SkeletonProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) setIsLoaded(true);
  }, []);

  return (
    <div className={clsx('relative', 'overflow-hidden', className, rounded && 'rounded-full')}>
      <img
        {...rest}
        ref={imageRef}
        src={src}
        alt={alt}
        className={clsx(isLoaded ? 'opacity-100 visible' : 'opacity-0 invisible')}
        onLoad={() => setIsLoaded(true)}
        draggable={false}
      />
      {!isLoaded && (
        <div
          className={clsx('absolute inset-0', 'bg-[length:200%] bg-skeleton', 'animate-skeleton')}
        />
      )}
    </div>
  );
};

export default Skeleton;
