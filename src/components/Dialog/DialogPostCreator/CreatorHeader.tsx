import clsx from 'clsx';

interface CreatorHeaderProps {
  onCreatePostSubmit: () => void;
}

const CreatorHeader = ({ onCreatePostSubmit }: CreatorHeaderProps) => {
  return (
    <div
      className={clsx('sticky top-0', 'flex-center text-sm py-3 border-b border-line', 'bg-white')}
    >
      <span className='font-medium'>Create new post</span>
      <button
        onClick={onCreatePostSubmit}
        className={clsx('abs-center-y right-3', 'btn float-right', 'text-primary')}
      >
        Share
      </button>
    </div>
  );
};

export default CreatorHeader;
