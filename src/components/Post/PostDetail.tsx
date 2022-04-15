import clsx from 'clsx';

const PostDetail = () => {
  return (
    <div className='flex flex-col gap-y-2 text-sm-1 mt-5'>
      <span className={clsx('font-medium', 'cursor-pointer')}>39,714 likes</span>
      <div>
        <span className={clsx('font-medium', 'cursor-pointer')}>duolingo</span>{' '}
        <span>the only photo dump you need.</span>
      </div>
      <span className={clsx('text-base-gray', 'cursor-pointer')}>View all 1,207 comments</span>
      <span className={clsx('uppercase text-xs-1', 'text-base-gray', 'cursor-pointer')}>
        2 days ago
      </span>
    </div>
  );
};

export default PostDetail;
