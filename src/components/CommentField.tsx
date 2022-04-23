import { Dispatch, FormEvent, SetStateAction } from 'react';

import clsx from 'clsx';

import IconEmoji from './Icon/IconEmoji';

interface CommentFieldProps {
  caption: string;
  className?: string;
  onSubmit: () => void;
  onSetCaption: Dispatch<SetStateAction<string>>;
}

const CommentField = ({ className, caption, onSetCaption, onSubmit }: CommentFieldProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('flex items-center px-4 py-3 border-t-1 border-line', className)}
    >
      <IconEmoji className={clsx('mr-4', 'cursor-pointer')} />
      <input
        value={caption}
        onChange={(e) => onSetCaption(e.target.value)}
        className={clsx('text-sm w-full', 'placeholder:text-base-gray')}
        placeholder='Add a comment...'
      />
      <button
        className={clsx('btn ml-auto text-sm', 'text-primary', !caption.trim() && 'btn--disabled')}
      >
        Post
      </button>
    </form>
  );
};

export default CommentField;
