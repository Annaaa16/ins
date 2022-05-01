import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

interface SkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  rounded?: boolean;
  online?: boolean;
  objectFit?: 'contain' | 'cover';
}

const Skeleton = ({ alt, src, rounded, className, objectFit, online, ...rest }: SkeletonProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) setIsLoaded(true);
  }, []);

  return (
    <div
      className={clsx(
        'relative',
        'flex-shrink-0',
        className,
        objectFit === 'cover' && 'w-full h-full',
      )}
    >
      <img
        {...rest}
        ref={imageRef}
        src={src}
        alt={alt}
        className={clsx(
          'w-full',
          isLoaded ? 'opacity-100 visible' : 'opacity-0 invisible',
          rounded && 'rounded-full',
          objectFit && ['h-full', objectFit === 'cover' ? 'object-cover' : 'object-contain'],
        )}
        onLoad={() => setIsLoaded(true)}
        draggable={false}
      />
      {!isLoaded && (
        <div
          className={clsx(
            'absolute inset-0',
            'bg-[length:200%] bg-skeleton',
            'animate-skeleton',
            rounded && 'rounded-full',
          )}
        />
      )}
      {online && (
        <div
          className={clsx(
            'absolute -bottom-0.5 -right-0.5',
            'w-4 h-4 border-3 border-white rounded-full',
            'bg-base-green',
          )}
        />
      )}
    </div>
  );
};

export default Skeleton;
