import { useEffect, useRef } from 'react';

import clsx from 'clsx';

import IconPhotoVideo from '~/components/Icon/IconPhotoVideo';
import DropZone from '~/components/DropZone';

interface CreatorPhotoProps {
  preview: string;
  oldPhoto: string;
  onSetPreview: (preview: string) => void;
  onSetOldPhoto: (photo: string) => void;
}

const CreatorPhoto = ({ preview, oldPhoto, onSetOldPhoto, onSetPreview }: CreatorPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSetFile = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      onSetPreview(reader.result as string);
      onSetOldPhoto('');
    };
  };

  useEffect(() => () => URL.revokeObjectURL(preview), [preview]);

  return (
    <div className='lg:w-3/5 h-[580px]'>
      <DropZone onDrop={handleSetFile} border={!oldPhoto && !preview}>
        {preview || oldPhoto ? (
          <div className='w-full h-full'>
            <img
              className={clsx('w-full h-full object-cover')}
              src={oldPhoto || preview}
              alt='Upload'
            />
          </div>
        ) : (
          <>
            <IconPhotoVideo />
            <h2 className={clsx('mt-3 text-xl', 'select-none')}>Drag photos and videos here</h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={clsx('btn mt-4 text-sm px-3 py-2', 'text-white bg-primary')}
            >
              <input
                ref={fileInputRef}
                accept='image/png, image/jpeg, image/gif'
                onChange={(e) => handleSetFile(e.target.files?.[0])}
                className='hidden'
                type='file'
              />
              Select from computer
            </button>
          </>
        )}
      </DropZone>
    </div>
  );
};

export default CreatorPhoto;
