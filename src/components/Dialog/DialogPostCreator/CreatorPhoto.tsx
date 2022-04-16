import { ChangeEvent, useEffect, useRef } from 'react';

import clsx from 'clsx';

import IconPhotoVideo from '~/components/Icon/IconPhotoVideo';
import DropZone from '~/components/DropZone';

interface CreatorPhotoProps {
  preview: string;
  onSetPreview: (text: string) => void;
}

const CreatorPhoto = ({ preview, onSetPreview }: CreatorPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSetFile = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => onSetPreview(reader.result as string);
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => handleSetFile(e.target.files?.[0]);

  useEffect(() => () => URL.revokeObjectURL(preview), [preview]);

  return (
    <div className='lg:w-3/5 h-[580px]'>
      {preview ? (
        <div className='w-full h-full'>
          <img className={clsx('w-full h-full object-cover')} src={preview} alt='Upload' />
        </div>
      ) : (
        <DropZone onDrop={handleSetFile}>
          <IconPhotoVideo />
          <h2 className={clsx('mt-3 text-xl', 'select-none')}>Drag photos and videos here</h2>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={clsx('btn mt-4 text-sm px-3 py-2', 'text-white bg-primary')}
          >
            <input
              ref={fileInputRef}
              accept='image/png, image/jpeg, image/gif'
              onChange={onImageChange}
              className='hidden'
              type='file'
            />
            Select from computer
          </button>
        </DropZone>
      )}
    </div>
  );
};

export default CreatorPhoto;
